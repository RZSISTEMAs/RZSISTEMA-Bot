const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('b-slap')
        .setDescription('Dê um tapa em alguém (com carinho... ou não).')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('Quem merece um tapa?')
                .setRequired(true)),
    async execute(interaction, client) {
        const user = interaction.options.getUser('usuario');
        const sender = interaction.user;

        if (user.id === sender.id) {
            return interaction.reply({ content: 'Não se bata! Você é incrível.', ephemeral: true });
        }

        const gifs = [
            'https://media.giphy.com/media/Gf3AUz3eBNbTW/giphy.gif',
            'https://media.giphy.com/media/xT9IgzFnSqzt2Sp3QA/giphy.gif',
            'https://media.giphy.com/media/Lp5L1r27qYdTZqGgS8/giphy.gif',
            'https://media.giphy.com/media/Q81NcsY6YxK7jxnr4v/giphy.gif',
            'https://media.giphy.com/media/jSVdJMwapxuBg5pQUB/giphy.gif'
        ];
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        const embed = new EmbedBuilder()
            .setDescription(`**${sender.username}** deu um tapa em **${user.username}**! 🤚`)
            .setImage(randomGif)
            .setColor('Orange');

        await interaction.reply({ embeds: [embed] });
    },
};
