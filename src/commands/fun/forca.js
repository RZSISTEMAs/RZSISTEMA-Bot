const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const words = [
    'DISCORD', 'BOT', 'JAVASCRIPT', 'PROGRAMACAO', 'COMPUTADOR', 'INTERNET',
    'DESENVOLVEDOR', 'SERVIDOR', 'COMUNIDADE', 'MUSICA', 'JOGO', 'VELHA',
    'AVENTURA', 'CAVALO', 'ELEFANTE', 'BRASIL', 'FUTEBOL', 'PIZZA', 'LASANHA', 'CHOCOLATE'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forca')
        .setDescription('Inicia um Jogo da Forca (Responda no chat).'),
    async execute(interaction, client) {
        const word = words[Math.floor(Math.random() * words.length)];
        const guessed = new Set();
        let wrongGuesses = 0;
        const maxWrongs = 6;

        const getDisplayWord = () => {
            return word.split('').map(letter => guessed.has(letter) ? letter : '\\_').join(' ');
        };

        const embed = new EmbedBuilder()
            .setTitle('🤠 Jogo da Forca')
            .setDescription(`Adivinhe a palavra (Digite uma letra ou a palavra inteira no chat!):\n\n# ${getDisplayWord()}`)
            .addFields({ name: 'Erros', value: `${wrongGuesses} / ${maxWrongs}`, inline: true })
            .setColor('Blue');

        await interaction.reply({ embeds: [embed] });

        const filter = m => m.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 60000 });

        collector.on('collect', async m => {
            const content = m.content.toUpperCase();
            
            // Apaga mensagem do usuário para limpar chat (opcional, precisa de permissão)
            m.delete().catch(() => {});

            if (content.length === 1) {
                // Letra
                if (guessed.has(content)) {
                    return interaction.followUp({ content: 'Você já tentou essa letra!', ephemeral: true });
                }

                guessed.add(content);

                if (!word.includes(content)) {
                    wrongGuesses++;
                }
            } else {
                // Palavra inteira (tentativa de chute)
                if (content === word) {
                    word.split('').forEach(l => guessed.add(l)); // Revela tudo
                } else {
                    wrongGuesses++;
                    interaction.followUp({ content: `Não é **${content}**!`, ephemeral: true });
                }
            }

            // Checa vitória/derrota
            const isWon = word.split('').every(l => guessed.has(l));
            const isLost = wrongGuesses >= maxWrongs;

            const newEmbed = new EmbedBuilder()
                .setTitle('🤠 Jogo da Forca')
                .setDescription(`Palavra:\n\n# ${getDisplayWord()}`)
                .addFields({ name: 'Erros', value: `${wrongGuesses} / ${maxWrongs}`, inline: true })
                .setColor(isWon ? 'Green' : (isLost ? 'Red' : 'Blue'));

            if (isWon) {
                newEmbed.setDescription(`🎉 **Parabéns!** Você acertou a palavra: **${word}**`);
                collector.stop();
            } else if (isLost) {
                newEmbed.setDescription(`☠️ **Você perdeu!** A palavra era: **${word}**`);
                collector.stop();
            }

            await interaction.editReply({ embeds: [newEmbed] });
        });
    },
};
