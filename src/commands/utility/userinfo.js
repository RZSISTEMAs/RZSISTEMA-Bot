const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Exibe informações sobre um usuário.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('O usuário para ver informações')),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        const embed = new EmbedBuilder()
            .setTitle(`Informações de ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: '🆔 ID', value: user.id, inline: true },
                { name: '🤖 Bot?', value: user.bot ? 'Sim' : 'Não', inline: true },
                { name: '📅 Conta Criada', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: false },
            )
            .setColor('Random');

        if (member) {
            embed.addFields(
                { name: '📅 Entrou no Servidor', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: false },
                { name: '🏷️ Cargos Principais', value: member.roles.cache.size > 1 ? member.roles.cache.map(r => r).slice(0, 3).join(', ') + (member.roles.cache.size > 3 ? ` e mais ${member.roles.cache.size - 3}` : '') : 'Nenhum', inline: false },
                { name: '🛡️ Permissões Principais', value: member.permissions.has('Administrator') ? '👑 Administrador' : (member.permissions.has('KickMembers') || member.permissions.has('BanMembers') ? '🔨 Moderador' : '👤 Membro'), inline: true }
            );
            
            // Tenta pegar o banner se existir (depende de nitro/cache)
            const fetchedUser = await user.fetch();
            if (fetchedUser.bannerURL()) {
                embed.setImage(fetchedUser.bannerURL({ size: 1024, dynamic: true }));
            }
        }

        await interaction.reply({ embeds: [embed] });
    },
};
