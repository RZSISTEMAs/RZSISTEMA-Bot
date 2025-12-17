const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adivinhar')
        .setDescription('Tente adivinhar o número que estou pensando (1 a 100).'),
    async execute(interaction, client) {
        const secretNumber = Math.floor(Math.random() * 100) + 1;
        
        await interaction.reply({ 
            content: 'Pensei em um número entre **1 e 100**. Você tem 30 segundos para digitar o número no chat!\n(Apenas você pode tentar)', 
            fetchReply: true 
        });

        const filter = m => m.author.id === interaction.user.id && !isNaN(m.content);
        const collector = interaction.channel.createMessageCollector({ filter, time: 30000, max: 1 });

        collector.on('collect', m => {
            const guess = parseInt(m.content);
            if (guess === secretNumber) {
                m.reply(`🎉 Parabéns! Você acertou! O número era **${secretNumber}**.`);
            } else {
                m.reply(`❌ Errou! O número era **${secretNumber}**. Mais sorte na próxima!`);
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.followUp('⏰ Tempo esgotado! O número era ' + secretNumber);
            }
        });
    },
};
