const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Limpa uma quantidade de mensagens do chat.')
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Número de mensagens a apagar (1-100)')
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction, client) {
        const amount = interaction.options.getInteger('amount');

        await interaction.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            interaction.reply({ content: 'Houve um erro ao tentar apagar as mensagens neste canal.', ephemeral: true });
        });

        return interaction.reply({ content: `🧹 Apagadas **${amount}** mensagens com sucesso.`, ephemeral: true });
    },
};
