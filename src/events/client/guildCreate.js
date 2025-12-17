const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'guildCreate',
    async execute(guild, client) {
        // Tenta achar um canal geral para mandar a mensagem
        let channel = guild.channels.cache.find(ch => 
            ch.name.includes('geral') || 
            ch.name.includes('chat') || 
            ch.name.includes('general') ||
            (ch.type === 0 && ch.permissionsFor(guild.members.me).has('SendMessages'))
        );

        // Se não achar pelo nome, pega o primeiro canal de texto onde tem permissão
        if (!channel) {
            channel = guild.channels.cache.find(ch => ch.type === 0 && ch.permissionsFor(guild.members.me).has('SendMessages'));
        }

        if (!channel) return; // Se não tiver onde falar, desiste.

        const embed = new EmbedBuilder()
            .setTitle('Obrigado por me adicionar! 🚀')
            .setDescription(`Olá **${guild.name}**! Eu sou o **RZSISTEMA Bot**, seu novo assistente completo.\n\nEstou aqui para trazer música, diversão, moderação e utilitários para sua comunidade.`)
            .addFields(
                { name: '📚 Como começar?', value: 'Use `/help` para ver minha lista de comandos.' },
                { name: '🌐 Painel Web', value: 'Visite nosso site oficial para documentação e suporte: [RZSISTEMA Web](https://rzsistema-bot-vz18.vercel.app/)' }
            )
            .setColor('Blurple')
            .setImage('attachment://rzsistema_bot_logo.png') // Vamos tentar usar a imagem se estiver no bundle, mas por enquanto placeholder ou link externo seria melhor se não tivermos host. Usando link do repo ou nada por enquanto.
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: 'Desenvolvido por RZSISTEMA' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Visitar Site')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://rzsistema-bot-vz18.vercel.app/'),
                new ButtonBuilder()
                    .setLabel('Suporte')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.gg/seuservidor') // Placeholder ou link do repo
            );

        await channel.send({ embeds: [embed], components: [row] }).catch(console.error);
    },
};
