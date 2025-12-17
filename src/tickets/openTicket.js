const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = async (interaction, client) => {
    const modal = new ModalBuilder()
        .setCustomId('ticket_modal')
        .setTitle('Abrir Ticket');

    const reasonInput = new TextInputBuilder()
        .setCustomId('ticket_reason')
        .setLabel('Qual o motivo do seu contato?')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(reasonInput);

    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
};
