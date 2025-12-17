const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Coloca um usuário de castigo (Timeout).')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('O usuário para colocar de castigo')
                .setRequired(true))
        .addIntegerOption(option => 
            option.setName('duration')
                .setDescription('Duração do castigo em minutos')
                .setRequired(true)
                .addChoices(
                    { name: '60 Segundos', value: 1 },
                    { name: '5 Minutos', value: 5 },
                    { name: '10 Minutos', value: 10 },
                    { name: '1 Hora', value: 60 },
                    { name: '1 Dia', value: 1440 },
                    { name: '1 Semana', value: 10080 },
                ))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Motivo do castigo'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'Sem motivo especificado';
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) return interaction.reply({ content: 'Usuário não encontrado.', ephemeral: true });
        if (!member.moderatable) return interaction.reply({ content: 'Não posso aplicar timeout neste usuário (Cargo superior ou igual ao meu).', ephemeral: true });

        // Converter minutos para milissegundos
        await member.timeout(duration * 60 * 1000, reason);

        await user.send(`Você recebeu um timeout (castigo) em **${interaction.guild.name}**.\nDuração: ${duration} minutos.\nMotivo: ${reason}`).catch(() => null);

        await interaction.reply({ content: `⏱️ **${user.tag}** entrou em timeout por **${duration} minutos**.\nMotivo: ${reason}` });
    },
};
