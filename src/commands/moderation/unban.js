const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Desbane um usuário do servidor.')
        .addStringOption(option => 
            option.setName('userid')
                .setDescription('ID do usuário a desbanir')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction, client) {
        const userId = interaction.options.getString('userid');

        try {
            await interaction.guild.members.unban(userId);
            await interaction.reply({ content: `🤝 Usuário com ID **${userId}** foi desbanido.` });
        } catch (error) {
            await interaction.reply({ content: `Erro ao desbanir: Verifique se o ID está correto ou se o usuário realmente estava banido.`, ephemeral: true });
        }
    },
};
