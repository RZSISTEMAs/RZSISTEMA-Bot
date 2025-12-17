const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Tranca o canal atual (impede que membros enviem mensagens).')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction, client) {
        const channel = interaction.channel;

        await channel.permissionOverwrites.edit(interaction.guild.id, {
            SendMessages: false
        });

        await interaction.reply({ content: `🔒 **${channel.name}** foi trancado com sucesso.` });
    },
};
