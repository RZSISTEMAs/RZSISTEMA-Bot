const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Retorna o ping do bot!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({ fetchReply: true });
        const newMessage = `API Latência: ${client.ws.ping}ms\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}ms`;
        await interaction.editReply({
            content: newMessage
        });
    },
};
