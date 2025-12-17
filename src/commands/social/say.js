const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Faz o bot falar algo por você.')
        .addStringOption(option => 
            option.setName('mensagem')
                .setDescription('O que eu devo falar?')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages), // Apenas moderadores para evitar abuso
    async execute(interaction, client) {
        const message = interaction.options.getString('mensagem');
        
        // Envia a mensagem no canal
        await interaction.channel.send(message);

        // Confirma para o usuário que enviou (efêmero, só ele vê)
        await interaction.reply({ content: '✅ Mensagem enviada!', ephemeral: true });
    },
};
