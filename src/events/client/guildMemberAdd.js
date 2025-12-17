const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        // Tenta achar um canal de 'boas-vindas' ou 'geral' ou 'chat-geral'
        const welcomeChannel = member.guild.channels.cache.find(ch => 
            ch.name.includes('boas-vindas') || 
            ch.name.includes('welcome') || 
            ch.name === 'geral'
        );

        if (!welcomeChannel) return;

        const welcomeEmbed = new EmbedBuilder()
            .setTitle(`Bem-vindo(a) ao servidor, ${member.user.username}! 🎉`)
            .setDescription(`Estamos muito felizes em ter você aqui no **${member.guild.name}**.\n\n🔸 Leia as regras.\n🔸 Divirta-se nos canais de voz.\n🔸 Use \`/help\` para ver meus comandos.`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setColor('Random')
            .setFooter({ text: `Membro nº ${member.guild.memberCount}` })
            .setTimestamp();

        try {
            await welcomeChannel.send({ content: `${member}`, embeds: [welcomeEmbed] });
        } catch (err) {
            console.error('Erro ao enviar boas-vindas:', err);
        }
    },
};
