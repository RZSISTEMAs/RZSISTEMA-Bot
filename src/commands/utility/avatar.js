const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Mostra o avatar de um usuário.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('O usuário para ver o avatar')),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user') || interaction.user;
        const embed = new EmbedBuilder()
            .setTitle(`Avatar de ${user.username}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor('Random');

        await interaction.reply({ embeds: [embed] });
    },
};
