const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('b-kiss')
        .setDescription('Dê um beijo em alguém!')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('Quem você quer beijar?')
                .setRequired(true)),
    async execute(interaction, client) {
        const user = interaction.options.getUser('usuario');
        const sender = interaction.user;

        if (user.id === sender.id) {
            return interaction.reply({ content: 'Se beijar? Isso é tecnicamente impossível (eu acho).', ephemeral: true });
        }

        const gifs = [
            'https://media.giphy.com/media/l2Je2M4Nfrit0L7sQ/giphy.gif',
            'https://media.giphy.com/media/nySFz3uUj6Q4E/giphy.gif',
            'https://media.giphy.com/media/bm2O3nXtc7MXs52y9k/giphy.gif',
            'https://media.giphy.com/media/vUrwEOLtBUnJe/giphy.gif',
            'https://media.giphy.com/media/QGc8RgGdXqKBW/giphy.gif'
        ];
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        const embed = new EmbedBuilder()
            .setDescription(`**${sender.username}** deu um beijo em **${user.username}**! 💋`)
            .setImage(randomGif)
            .setColor('Red');

        await interaction.reply({ embeds: [embed] });
    },
};
