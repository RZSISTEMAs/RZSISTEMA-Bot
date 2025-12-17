const { EmbedBuilder, AuditLogEvent } = require('discord.js');

module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        if (!message.guild || message.author.bot) return;

        // Procura canal de logs
        const logChannel = message.guild.channels.cache.find(ch => 
            ch.name === 'logs-rzsistema' || 
            ch.name === 'logs' ||
            ch.name === 'mod-logs'
        );

        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle('🗑️ Mensagem Deletada')
            .setColor('Red')
            .addFields(
                { name: 'Autor', value: `${message.author.tag} (<@${message.author.id}>)`, inline: true },
                { name: 'Canal', value: `${message.channel}`, inline: true },
                { name: 'Conteúdo', value: message.content || '*A mensagem não continha texto (anexo ou embed)*' }
            )
            .setFooter({ text: `ID: ${message.id}` })
            .setTimestamp();

        // Tenta pegar quem deletou (via Audit Logs) - Nota: isso nem sempre é 100% preciso se for deletado muito rápido ou por bot
        try {
             // Delay curto para garantir que o audit log foi criado
            setTimeout(async () => {
                const fetchedLogs = await message.guild.fetchAuditLogs({
                    limit: 1,
                    type: AuditLogEvent.MessageDelete,
                });
                const deletionLog = fetchedLogs.entries.first();

                if (deletionLog) {
                    const { executor, target } = deletionLog;
                    // Se o alvo do delete for o autor da mensagem e foi recente (5 segs)
                    if (target.id === message.author.id && (Date.now() - deletionLog.createdTimestamp < 5000)) {
                         embed.addFields({ name: 'Deletado por', value: `${executor.tag}`, inline: true });
                    }
                }
                logChannel.send({ embeds: [embed] }).catch(console.error);
            }, 1000);
           
        } catch (err) {
            console.error('Erro ao buscar audit logs:', err);
            logChannel.send({ embeds: [embed] }).catch(console.error);
        }
    },
};
