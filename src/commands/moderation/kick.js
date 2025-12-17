const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulsa um usuário do servidor.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('O usuário a ser expulso')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('O motivo da expulsão'))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'Sem motivo especificado';
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) return interaction.reply({ content: 'Usuário não encontrado no servidor.', ephemeral: true });

        if (!member.kickable) return interaction.reply({ content: 'Não consigo expulsar este usuário. Ele pode ter um cargo superior ao meu.', ephemeral: true });

        // Tenta enviar DM para o usuário antes de expulsar
        await member.send(`Você foi expulso de **${interaction.guild.name}**.\nMotivo: ${reason}`).catch(() => null);

        await member.kick(reason);
        await interaction.reply({ content: `🦶 **${user.tag}** foi expulso.\nMotivo: ${reason}` });
    },
};
