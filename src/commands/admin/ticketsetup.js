const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketsetup')
        .setDescription('Envia o painel de tickets para o canal atual.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('Central de Atendimento')
            .setDescription('Precisa de ajuda? Clique no botão abaixo para abrir um ticket privado com a nossa equipe.')
            .setColor('Green')
            .setFooter({ text: 'RZSISTEMA Support' });

        const button = new ButtonBuilder()
            .setCustomId('open_ticket')
            .setLabel('Abrir Ticket 🎫')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({ content: 'Painel enviado!', ephemeral: true });
        await interaction.channel.send({ embeds: [embed], components: [row] });
    },
};
