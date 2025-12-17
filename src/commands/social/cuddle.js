const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cuddle')
        .setDescription('Faça um carinho/cafuné em alguém! 🥰')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('Quem merece um carinho?')
                .setRequired(true)),
    async execute(interaction, client) {
        const user = interaction.options.getUser('usuario');
        const sender = interaction.user;

        const gifs = [
            'https://media.tenor.com/0PIj7XctFr4AAAAM/a-whisker-away-cuddle.gif',
            'https://media.tenor.com/sXyS_c9x4cIAAAAM/cats-cuddle.gif',
            'https://media.tenor.com/kCZjTqCKiggAAAAM/cuddle.gif',
            'https://media.tenor.com/KD_eK5M6xXAAAAAM/cuddle-warm.gif'
        ];
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        const embed = new EmbedBuilder()
            .setDescription(`**${sender.username}** está fazendo carinho em **${user.username}**! 🥰`)
            .setImage(randomGif)
            .setColor('Gold');

        await interaction.reply({ embeds: [embed] });
    },
};
