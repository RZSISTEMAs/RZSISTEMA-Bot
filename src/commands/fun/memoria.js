const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('memoria')
        .setDescription('Jogo da Memória (Emoji Match).'),
    async execute(interaction, client) {
        const emojis = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓'];
        // Duplica e embaralha
        let deck = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
        
        // Estado do jogo
        // 4x3 grid (12 cartas)
        // Mapeia botões para índice do deck
        let revealed = new Array(12).fill(false);
        let matched = new Array(12).fill(false);
        let firstSelection = null; // { index, interaction }
        let busy = false; // Evita cliques rápidos durante animação de erro

        const generateRows = (showAll = false) => {
            const rows = [];
            for (let i = 0; i < 3; i++) {
                const row = new ActionRowBuilder();
                for (let j = 0; j < 4; j++) {
                    const idx = i * 4 + j;
                    const isRevealed = showAll || revealed[idx] || matched[idx];
                    
                    row.addComponents(
                        new ButtonBuilder()
                            .setCustomId(`mem_${idx}`)
                            .setLabel(isRevealed ? deck[idx] : '❓')
                            .setStyle(matched[idx] ? ButtonStyle.Success : (revealed[idx] ? ButtonStyle.Primary : ButtonStyle.Secondary))
                            .setDisabled(matched[idx] || (revealed[idx] && firstSelection?.index !== idx)) // Desabilita se já combinado
                    );
                }
                rows.push(row);
            }
            return rows;
        };

        const msg = await interaction.reply({ 
            content: '🧠 Jogo da Memória! Encontre os pares.', 
            components: generateRows(),
            fetchReply: true 
        });

        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

        collector.on('collect', async i => {
            if (i.user.id !== interaction.user.id) return i.reply({ content: 'Não é seu jogo!', ephemeral: true });
            
            if (busy) return i.deferUpdate();

            const idx = parseInt(i.customId.split('_')[1]);

            if (revealed[idx] || matched[idx]) return i.deferUpdate();

            // Revela a carta
            revealed[idx] = true;
            
            if (firstSelection === null) {
                // Primeira carta virada
                firstSelection = idx;
                await i.update({ components: generateRows() });
            } else {
                // Segunda carta virada
                const firstIdx = firstSelection;
                
                // Atualiza visualmente para mostrar a segunda carta
                await i.update({ components: generateRows() });

                if (deck[idx] === deck[firstIdx]) {
                    // Match!
                    matched[idx] = true;
                    matched[firstIdx] = true;
                    firstSelection = null;
                    
                    // Checa vitória
                    if (matched.every(test => test)) {
                        await interaction.editReply({ content: '🎉 Parabéns! Você encontrou todos os pares!', components: generateRows(true) });
                        collector.stop();
                    } else {
                        // Atualiza botões para Verde (Success)
                        await interaction.editReply({ components: generateRows() });
                    }
                } else {
                    // Erro
                    busy = true;
                    setTimeout(async () => {
                        revealed[idx] = false;
                        revealed[firstIdx] = false;
                        firstSelection = null;
                        busy = false;
                        await interaction.editReply({ components: generateRows() });
                    }, 1500);
                }
            }
        });
    },
};
