const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Responde sua pergunta com sabedoria (aleatória).')
        .addStringOption(option => 
            option.setName('pergunta')
                .setDescription('Sua pergunta para a bola mágica')
                .setRequired(true)),
    async execute(interaction, client) {
        const responses = [
            'Com certeza!', 'Meus fontes dizem que sim.', 'Provavelmente.', 
            'Não conte com isso.', 'Minha resposta é não.', 'Duvido muito.',
            'Pergunte novamente mais tarde.', 'Melhor não te contar agora.'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const question = interaction.options.getString('pergunta');

        await interaction.reply(`🎱 **Pergunta:** ${question}\n**Resposta:** ${randomResponse}`);
    },
};
