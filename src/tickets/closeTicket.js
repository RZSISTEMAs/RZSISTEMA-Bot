const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = async (interaction, client) => {
    if (!interaction.channel.name.startsWith('ticket-')) {
        return interaction.reply({ content: 'Este comando só pode ser usado em tickets.', ephemeral: true });
    }

    await interaction.reply('⏳ Fechando ticket... Gerando transcrição da conversa.');

    try {
        // Coleta mensagens (limite 100)
        const messages = await interaction.channel.messages.fetch({ limit: 100 });
        const reverseMessages = messages.reverse();
        
        let transcript = `TRANSCRICAO DO TICKET: ${interaction.channel.name}\n`;
        transcript += `Data de Fechamento: ${new Date().toLocaleString()}\n`;
        transcript += `--------------------------------------------------\n\n`;

        reverseMessages.forEach(msg => {
            const time = msg.createdAt.toLocaleTimeString();
            transcript += `[${time}] ${msg.author.tag}: ${msg.content}\n`;
        });

        const attachment = new AttachmentBuilder(Buffer.from(transcript, 'utf-8'), { name: `transcript-${interaction.channel.name}.txt` });

        // Tenta mandar no DM do usuário que clicou
        try {
            await interaction.user.send({ 
                content: `Obrigado por usar nosso suporte! Aqui está o histórico do seu ticket **${interaction.channel.name}**.`, 
                files: [attachment] 
            });
        } catch (dmError) {
            console.log("Não foi possível enviar DM para o usuário (DM fechada).");
        }

        // Tenta mandar num canal de logs se existir
        const logChannel = interaction.guild.channels.cache.find(ch => ch.name === 'logs-ticket' || ch.name === 'logs');
        if (logChannel) {
             await logChannel.send({ 
                content: `🔒 Ticket fechado por ${interaction.user.tag}`, 
                files: [attachment] 
            });
        }

    } catch (err) {
        console.error("Erro ao gerar transcript:", err);
    }
    
    // Deleta o canal
    setTimeout(() => {
        interaction.channel.delete().catch(e => console.error("Erro ao deletar sala:", e));
    }, 5000);
};
