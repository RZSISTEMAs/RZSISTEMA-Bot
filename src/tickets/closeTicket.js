module.exports = async (interaction, client) => {
    if (!interaction.channel.name.startsWith('ticket-')) {
        return interaction.reply({ content: 'Este comando só pode ser usado em tickets.', ephemeral: true });
    }

    await interaction.reply('Fechando ticket em 5 segundos...');
    
    setTimeout(() => {
        interaction.channel.delete().catch(e => console.error("Erro ao deletar sala:", e));
    }, 5000);
};
