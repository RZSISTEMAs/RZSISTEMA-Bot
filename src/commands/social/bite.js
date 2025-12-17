const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bite')
        .setDescription('Dê uma mordidinha em alguém! 🦷')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('Quem você quer morder?')
                .setRequired(true)),
    async execute(interaction, client) {
        const user = interaction.options.getUser('usuario');
        const sender = interaction.user;

        if (user.id === sender.id) {
            return interaction.reply({ content: 'Cuidado para não se machucar! 😬', ephemeral: true });
        }

        const gifs = [
            'https://media.tenor.com/noV5mMA7TMQAAAAM/biting-bite.gif',
            'https://media.tenor.com/-4X07hO3X2IAAAAM/anime-bite.gif',
            'https://media.tenor.com/_6J_qZ1jJpAAAAAM/bite-anime.gif',
            'https://media.tenor.com/E70k5Z8j68YAAAAM/bite-anime.gif'
        ];
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        const embed = new EmbedBuilder()
            .setDescription(`**${sender.username}** mordeu **${user.username}**! 🦷`)
            .setImage(randomGif)
            .setColor('Red');

        await interaction.reply({ embeds: [embed] });
    },
};
