const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Destranca o canal atual (permite que membros enviem mensagens).')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction, client) {
        const channel = interaction.channel;

        await channel.permissionOverwrites.edit(interaction.guild.id, {
            SendMessages: true
        });

        await interaction.reply({ content: `🔓 **${channel.name}** foi destrancado com sucesso.` });
    },
};
