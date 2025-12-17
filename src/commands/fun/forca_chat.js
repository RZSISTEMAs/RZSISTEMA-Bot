const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

const words = [
    'DISCORD', 'BOT', 'JAVASCRIPT', 'PROGRAMACAO', 'COMPUTADOR', 'INTERNET',
    'DESENVOLVEDOR', 'SERVIDOR', 'COMUNIDADE', 'MUSICA', 'JOGO', 'VELHA',
    'AVENTURA', 'CAVALO', 'ELEFANTE', 'BRASIL', 'FUTEBOL', 'PIZZA', 'LASANHA', 'CHOCOLATE'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forca')
        .setDescription('Inicia um Jogo da Forca.'),
    async execute(interaction, client) {
        const word = words[Math.floor(Math.random() * words.length)];
        const guessed = new Set();
        let wrongGuesses = 0;
        const maxWrongs = 6;
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        // Estado inicial
        const getDisplayWord = () => {
            return word.split('').map(letter => guessed.has(letter) ? letter : '_').join(' ');
        };

        const generateComponents = () => {
            const rows = [];
            // Cria 5 fileiras de botões (max 5 botões por linha, 26 letras = 5+5+5+5+6 = 5 linhas)
            let currentRow = new ActionRowBuilder();
            let count = 0;

            for (const letter of alphabet) {
                const btn = new ButtonBuilder()
                    .setCustomId(`guess_${letter}`)
                    .setLabel(letter)
                    .setStyle(guessed.has(letter) ? (word.includes(letter) ? ButtonStyle.Success : ButtonStyle.Danger) : ButtonStyle.Secondary)
                    .setDisabled(guessed.has(letter));
                
                currentRow.addComponents(btn);
                count++;

                if (count % 5 === 0 && count < 25) {
                    rows.push(currentRow);
                    currentRow = new ActionRowBuilder();
                }
            }
            if (currentRow.components.length > 0) rows.push(currentRow);
            
            // Se tiver mais de 5 rows (ActionRow limit é 5), precisamos simplificar ou usar SelectMenu.
            // 26 letras ocupam muito espaço. Vamos usar um SelectMenu? Não, botões são mais rápidos.
            // Mas o limite de ActionRows por mensagem é 5.
            // 5 linhas * 5 botões = 25 botões. Falta o 'Z'.
            // Vamos agrupar 'Z' na ultima linha ou algo assim. 
            // Solução: Adicionar Z na ultima linha. A ultima linha pode ter menos.
            // Mas espere, 26 letras. 5x5 = 25. Sobra 1.
            // O Discord permite 5 rows. Então dá! 5, 5, 5, 5, 6.
            // Ops, max botões por row é 5.
            // Então 26 botões precisam de 6 linhas (5*5=25 + 1). Isso excede o limite (5).
            // Solução Alternativa: Input de texto via Modal ou Chat, ou dividir o alfabeto em páginas.
            // Vamos simplicar: Jogado via chat message collector? 
            // Ou usar botões "A-E", "F-J"... para abrir submenus?
            // Melhor: Usar Modal para chutar letra ou palavra completa.
            
            return []; // Retorna vazio se usarmos modal/chat
        };

        // Vamos usar abordagem Híbrida: Botão "Chutar Letra" abre Modal. Botão "Chutar Palavra".
        
        const mainEmbed = new EmbedBuilder()
            .setTitle('Jogo da Forca 🤠')
            .setDescription(`Adivinhe a palavra:\n\n# \`${getDisplayWord()}\`\n\nErros: ${wrongGuesses}/${maxWrongs}`)
            .setColor('Blue');

        const btnGuess = new ButtonBuilder()
            .setCustomId('guess_letter')
            .setLabel('Chutar Letra')
            .setStyle(ButtonStyle.Primary);
            
        const btnSolve = new ButtonBuilder()
            .setCustomId('solve_word')
            .setLabel('Chutar Palavra')
            .setStyle(ButtonStyle.Success);
            
        const row = new ActionRowBuilder().addComponents(btnGuess, btnSolve);

        const msg = await interaction.reply({ embeds: [mainEmbed], components: [row], fetchReply: true });

        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 300000 }); // 5 min

        collector.on('collect', async i => {
            if (i.user.id !== interaction.user.id) return i.reply({ content: 'Esse jogo não é seu!', ephemeral: true });

            if (i.customId === 'guess_letter') {
                const modal = {
                    title: 'Chutar Letra',
                    customId: 'modal_guess_letter',
                    components: [{
                        type: 1,
                        components: [{
                            type: 4,
                            custom_id: 'letter_input',
                            label: 'Digite UMA letra:',
                            style: 1,
                            min_length: 1,
                            max_length: 1,
                            required: true
                        }]
                    }]
                };
                await i.showModal(modal);
            } else if (i.customId === 'solve_word') {
                 const modal = {
                    title: 'Chutar Palavra',
                    customId: 'modal_solve_word',
                    components: [{
                        type: 1,
                        components: [{
                            type: 4,
                            custom_id: 'word_input',
                            label: 'Qual a palavra?',
                            style: 1,
                            min_length: 1,
                            required: true
                        }]
                    }]
                };
                await i.showModal(modal);
            }
        });

        // Precisamos de um listener global ou local para o modal?
        // Collector de modal pode ser criado na interação original se usarmos awaitModalSubmit, mas o `djs` novo usa interaction.awaitModalSubmit
        // Como o modal é disparado de um botão, o `i.showModal` não retorna uma promise de submit direto.
        // Precisamos capturar o submit no `interactionCreate.js` OU usar um `awaitModalSubmit` no fluxo.
        // O `interactionCreate` é global. Para este jogo ser self-contained, precisamos esperar lá?
        // Não, podemos usar `i.awaitModalSubmit` DEPOIS de showModal.
        
        // Correção: O collector acima pega o CLIQUE do botão. Dentro dele, mostramos modal.
        // Aí esperamos o submit desse modal ESPECÍFICO.
    },
};

// NOTA: A implementação acima da Forca com Modal é complexa para um passo único
// Vamos fazer uma versão simplificada onde o usuário clica em botões de letras?
// Já vimos que não cabem todos.
// Vamos fazer versão CHAT MESSAGE. O usuário digita a letra no chat.
