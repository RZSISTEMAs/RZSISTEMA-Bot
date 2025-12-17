const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Calcule a porcentagem de amor entre duas pessoas! ❤️')
        .addUserOption(option => 
            option.setName('usuario1')
                .setDescription('A primeira pessoa')
                .setRequired(true))
        .addUserOption(option => 
            option.setName('usuario2')
                .setDescription('A segunda pessoa')
                .setRequired(false)),
    async execute(interaction, client) {
        const user1 = interaction.options.getUser('usuario1');
        const user2 = interaction.options.getUser('usuario2') || interaction.user;

        if (user1.id === user2.id) {
            return interaction.reply({ content: 'Amor próprio é tudo, né? 100%!', ephemeral: true });
        }

        // Algoritmo "complexo" de amor baseado na soma dos IDs (para ser consistente sempre que rodar)
        // Isso garante que user1+user2 dê sempre a mesma porcentagem, em vez de ser aleatório toda vez.
        const loveScore = (parseInt(user1.id.slice(-4)) + parseInt(user2.id.slice(-4))) % 101;
        
        // Barra de progresso visual
        const filledBar = '⬛'.repeat(Math.floor(loveScore / 10));
        const emptyBar = '⬜'.repeat(10 - Math.floor(loveScore / 10));

        let message = '';
        if (loveScore < 20) message = '💔 Vish... Nem tentem.';
        else if (loveScore < 50) message = '🤔 Talvez com muita terapia...';
        else if (loveScore < 80) message = '❤️ Olha, tem futuro!';
        else message = '💍 Casal do ano! Perfeitos!';

        const embed = new EmbedBuilder()
            .setTitle(`💗 Love Calculator`)
            .setDescription(`**${user1.username}** + **${user2.username}**\n\n**${loveScore}%** [${filledBar}${emptyBar}]\n\n${message}`)
            .setThumbnail(user1.displayAvatarURL({ dynamic: true }))
            .setImage(user2.displayAvatarURL({ dynamic: true }))
            .setColor(loveScore > 50 ? 'Red' : 'Grey')
            .setFooter({ text: 'O amor está no ar... (ou não)' });

        await interaction.reply({ embeds: [embed] });
    },
};
