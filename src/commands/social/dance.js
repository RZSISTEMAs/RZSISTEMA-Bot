const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dance')
        .setDescription('Dance com alguém ou sozinho! 💃')
        .addUserOption(option => 
            option.setName('usuario')
                .setDescription('Convidar alguém para dançar? (Opcional)')),
    async execute(interaction, client) {
        const user = interaction.options.getUser('usuario');
        const sender = interaction.user;

        const gifs = [
            'https://media.tenor.com/GOabrbLMl4AAAAAM/anime-dance.gif',
            'https://media.tenor.com/YoPTed-g8O0AAAAM/dance-dancing.gif',
            'https://media.tenor.com/Xy1V8V1A20AAAAAM/dance-party.gif'
        ];
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        const description = user 
            ? `**${sender.username}** tirou **${user.username}** para dançar! 💃🕺`
            : `**${sender.username}** começou a dançar na pista! 💃`;

        const embed = new EmbedBuilder()
            .setDescription(description)
            .setImage(randomGif)
            .setColor('Purple');

        await interaction.reply({ embeds: [embed] });
    },
};
