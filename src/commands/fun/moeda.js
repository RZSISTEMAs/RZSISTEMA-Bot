const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moeda')
        .setDescription('Joga uma moeda (Cara ou Coroa).'),
    async execute(interaction, client) {
        const result = Math.random() < 0.5 ? 'Cara' : 'Coroa';
        await interaction.reply(`🪙 **${result}!**`);
    },
};
