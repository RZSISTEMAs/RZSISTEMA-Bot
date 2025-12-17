const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('b-hug')
        .setDescription('Dê um abraço em alguém!')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('Quem você quer abraçar?')
                .setRequired(true)),
    async execute(interaction, client) {
        const user = interaction.options.getUser('usuario');
        const sender = interaction.user;

        if (user.id === sender.id) {
            return interaction.reply({ content: 'Você não pode se abraçar... Mas aqui vai um abraço virtual meu! 🤗', ephemeral: true });
        }

        const gifs = [
            'https://media.giphy.com/media/od5H3PmEG5tC/giphy.gif',
            'https://media.giphy.com/media/3oEdv4hwWTzBhWvaU0/giphy.gif',
            'https://media.giphy.com/media/u9BxQbM5r9jFhUA827/giphy.gif',
            'https://media.giphy.com/media/lrr9rHuoPAEGLUbs9B/giphy.gif',
            'https://media.giphy.com/media/wIePCLOwIN4pAClzYk/giphy.gif'
        ];
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        const embed = new EmbedBuilder()
            .setDescription(`**${sender.username}** deu um abraço apertado em **${user.username}**! 🤗`)
            .setImage(randomGif)
            .setColor('Random');

        await interaction.reply({ embeds: [embed] });
    },
};
