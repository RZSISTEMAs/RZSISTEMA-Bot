const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('radio')
        .setDescription('Toca uma rádio online via link.')
        .addStringOption(option => 
            option.setName('url')
                .setDescription('Link da rádio (ex: stream .mp3/.m3u8)')
                .setRequired(true)),
    async execute(interaction, client) {
        const url = interaction.options.getString('url');
        const channel = interaction.member.voice.channel;

        if (!channel) return interaction.reply({ content: '❌ Você precisa estar em um canal de voz!', ephemeral: true });

        await interaction.deferReply();

        try {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            // Criação direta do recurso de áudio para rádios (costuma ser mais estável que play-dl para streams zeno/shoutcast)
            const resource = createAudioResource(url);
            const player = createAudioPlayer();

            player.play(resource);
            connection.subscribe(player);

            player.on('error', error => {
                console.error('Erro no Radio Player:', error);
                interaction.followUp({ content: '❌ A rádio caiu ou o link é inválido.', ephemeral: true }).catch(() => null);
            });

            await interaction.editReply(`📻 **Rádio Ligada!**\nSintonizando: ${url}\n\n*Se não sair som, o link pode ser incompatível com o Discord.*`);
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `❌ Erro ao ligar rádio: ${error.message}` });
        }
    },
};
