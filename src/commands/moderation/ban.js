const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bane um usuário do servidor.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('O usuário a ser banido')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('O motivo do banimento'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'Sem motivo especificado';
        const member = await interaction.guild.members.fetch(user.id).catch(err => {});

        // Nota: Podemos banir usuários mesmo que não estejam no servidor
        if (member && !member.bannable) return interaction.reply({ content: 'Não consigo banir este usuário. Ele pode ter um cargo superior ao meu.', ephemeral: true });

        // Tenta enviar DM
        await user.send(`Você foi banido de **${interaction.guild.name}**.\nMotivo: ${reason}`).catch(() => null);

        await interaction.guild.members.ban(user.id, { reason });
        await interaction.reply({ content: `🔨 **${user.tag}** foi banido.\nMotivo: ${reason}` });
    },
};
