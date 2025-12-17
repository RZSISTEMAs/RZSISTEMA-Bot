const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reuniao')
        .setDescription('Cria uma sala de reunião temporária.')
        .addStringOption(option => 
            option.setName('assunto')
                .setDescription('Assunto da reunião')
                .setRequired(true)),
    async execute(interaction, client) {
        const guild = interaction.guild;
        const member = interaction.member;
        const topic = interaction.options.getString('assunto');

        try {
            const channel = await guild.channels.create({
                name: `📢 Reunião: ${topic}`,
                type: ChannelType.GuildVoice,
                parent: member.voice.channel?.parent || null,
                permissionOverwrites: [
                    {
                        id: guild.id,
                        allow: [PermissionFlagsBits.Connect], // Aberta para todos
                    },
                    {
                        id: member.id,
                        allow: [PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers, PermissionFlagsBits.MoveMembers], // Moderador da call
                    }
                ]
            });

            await interaction.reply({ content: `📢 **Reunião Criada!**\nSala: ${channel}\nAssunto: ${topic}\n(Será apagada ao esvaziar)`, ephemeral: false });

            if (member.voice.channel) {
                await member.voice.setChannel(channel);
            }

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Erro ao criar reunião.', ephemeral: true });
        }
    },
};
