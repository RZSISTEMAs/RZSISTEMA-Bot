const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
    name: 'clientReady',
    once: true,
    async execute(client) {
        console.log(`Pronto! ${client.user.tag} está online e operante.`);
        client.user.setActivity('RZSISTEMA App', { type: 4 }); // Custom Status
    },
};
