const { EmbedBuilder, PermissionFlagsBits, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = async (interaction, client) => {
    const reason = interaction.fields.getTextInputValue('ticket_reason');
    const user = interaction.user;
    const guild = interaction.guild;

    // Criar canal
    try {
        const channel = await guild.channels.create({
            name: `ticket-${user.username}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: user.id,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                },
                {
                    id: client.user.id,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                },
                // Adicione permissão para Cargo de Admin geral se quiser
                // Como não sabemos o ID do cargo de admin, quem tiver permissão de 'Administrator' verá o canal de qualquer forma.
            ],
        });

        const embed = new EmbedBuilder()
            .setTitle(`Ticket de ${user.username}`)
            .setDescription(`**Motivo:** ${reason}\n\nAguarde, um administrador irá atendê-lo em breve.`)
            .setColor('Blue')
            .setTimestamp();

        const closeButton = new ButtonBuilder()
            .setCustomId('close_ticket')
            .setLabel('Fechar Ticket 🔒')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(closeButton);

        await channel.send({ content: `${user}`, embeds: [embed], components: [row] });

        await interaction.reply({ content: `✅ Ticket criado com sucesso: ${channel}`, ephemeral: true });

    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Erro ao criar o ticket. Verifique minhas permissões.', ephemeral: true });
    }
};
