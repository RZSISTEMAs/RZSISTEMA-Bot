const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dado')
        .setDescription('Rola um dado com a quantidade de lados escolhida.')
        .addIntegerOption(option => 
            option.setName('lados')
                .setDescription('Número de lados do dado (Padrão: 6)')
                .setMinValue(2)
                .setMaxValue(100)),
    async execute(interaction, client) {
        const sides = interaction.options.getInteger('lados') || 6;
        const result = Math.floor(Math.random() * sides) + 1;

        await interaction.reply({ content: `🎲 Você rolou um **dado de ${sides} lados** e tirou: **${result}**` });
    },
};
