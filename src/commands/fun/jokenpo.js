const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jokenpo')
        .setDescription('Jogue Pedra, Papel ou Tesoura contra o bot!'),
    async execute(interaction, client) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('pedra').setLabel('Pedra 🪨').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('papel').setLabel('Papel 📄').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('tesoura').setLabel('Tesoura ✂️').setStyle(ButtonStyle.Primary),
            );

        const embed = new EmbedBuilder()
            .setTitle('Jokenpô!')
            .setDescription('Escolha sua jogada:')
            .setColor('Blue');

        const response = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

        const filter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent({ filter, time: 30000 });

            const choices = ['pedra', 'papel', 'tesoura'];
            const botChoice = choices[Math.floor(Math.random() * choices.length)];
            const userChoice = confirmation.customId;

            let result;
            if (userChoice === botChoice) result = 'Empate! 😐';
            else if (
                (userChoice === 'pedra' && botChoice === 'tesoura') ||
                (userChoice === 'papel' && botChoice === 'pedra') ||
                (userChoice === 'tesoura' && botChoice === 'papel')
            ) result = 'Você ganhou! 🎉';
            else result = 'Você perdeu! 🤖';

            const resultEmbed = new EmbedBuilder()
                .setTitle(result)
                .setDescription(`Você: **${userChoice}**\nBot: **${botChoice}**`)
                .setColor(result.includes('ganhou') ? 'Green' : (result.includes('perdeu') ? 'Red' : 'Yellow'));

            await confirmation.update({ embeds: [resultEmbed], components: [] });

        } catch (e) {
            await interaction.editReply({ content: 'Tempo esgotado! Jogo cancelado.', components: [] });
        }
    },
};
