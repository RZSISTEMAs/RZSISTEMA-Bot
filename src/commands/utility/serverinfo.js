const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Exibe informações sobre o servidor.'),
    async execute(interaction, client) {
        const { guild } = interaction;
        const embed = new EmbedBuilder()
            .setTitle(`Informações de ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '👑 Dono', value: `<@${guild.ownerId}>`, inline: true },
                { name: '🆔 ID do Servidor', value: `${guild.id}`, inline: true },
                { name: '👥 Membros', value: `${guild.memberCount}`, inline: true },
                { name: '💬 Canais', value: `${guild.channels.cache.size}`, inline: true },
                { name: '🏷️ Cargos', value: `${guild.roles.cache.size}`, inline: true },
                { name: '🚀 Boosts', value: `${guild.premiumSubscriptionCount || 0} (Nível ${guild.premiumTier})`, inline: true },
                { name: '📅 Criado em', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: false },
            )
            .setImage(guild.bannerURL({ size: 1024 }))
            .setColor('Blue')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });
    },
};
