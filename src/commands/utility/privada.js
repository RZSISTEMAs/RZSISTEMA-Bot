const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('privada')
        .setDescription('Cria uma sala de voz temporária só para você (e quem você convidar).')
        .addIntegerOption(option => 
            option.setName('limite')
                .setDescription('Limite máximo de pessoas (0 = sem limite)')
                .setMinValue(0)
                .setMaxValue(99))
        .addUserOption(option => 
            option.setName('convidado')
                .setDescription('Usuário específico para liberar acesso (opcional)')),
    async execute(interaction, client) {
        const guild = interaction.guild;
        const member = interaction.member;
        
        const limit = interaction.options.getInteger('limite') || 0;
        const guest = interaction.options.getUser('convidado');

        // Criação do canal
        try {
            const channelName = `🔒 Privada de ${member.user.username}`;
            
            const permissionOverwrites = [
                {
                    id: guild.id,
                    deny: [PermissionFlagsBits.Connect], // Ninguém entra por padrão (exceto se for pública, mas vamos fazer privada por padrão?)
                    // O usuário pediu "criar sala com outra pessoa". Vamos assumir que é privada por padrão se tiver convidado, ou aberta?
                    // "conversa-solo" sugere privado.
                    // Vamos negar Connect para @everyone e permitir apenas para O Criador e o Convidado.
                },
                {
                    id: member.id,
                    allow: [PermissionFlagsBits.Connect, PermissionFlagsBits.ManageChannels, PermissionFlagsBits.MoveMembers], // Dono gerencia
                }
            ];

            if (guest) {
                permissionOverwrites.push({
                    id: guest.id,
                    allow: [PermissionFlagsBits.Connect],
                });
            } else {
                 // Se não tem convidado específico, talvez o usuário queira que seja pública mas com limite?
                 // Ou ele quer uma sala "Solo" para ficar sozinho? 
                 // Vamos deixar Connect allow para everyone SE não tiver convidado?
                 // Não, o nome é "privada". Vamos deixar fechada. O dono pode abrir depois ou mover gente.
                 // Mas se ele quiser "especificar quantidade de pessoas", ele pode querer 5 amigos.
                 // Vamos fazer Híbrido: Se limite > 0 e sem convidado -> Aberta com limite.
                 // Se tem convidado -> Fechada só para eles.
            }
            
            // Reajuste de lógica para ser mais amigável
            if (!guest) {
                // Sem convidado específico = Sala Aberta (Publica) com Limite opcional?
                // Ou Sala Fechada só para mim?
                // Vou deixar: Sala Aberta com Limite definido. "🔒" no nome pode confundir se for aberta.
                // Mas o auto-delete depende do nome.
                permissionOverwrites[0].allow = [PermissionFlagsBits.Connect]; // Libera everyone
                permissionOverwrites[0].deny = []; // Remove bloqueio
            }

            const channel = await guild.channels.create({
                name: channelName,
                type: ChannelType.GuildVoice,
                parent: member.voice.channel?.parent || null, // Tenta criar na mesma categoria que ele está, ou solto
                userLimit: limit,
                permissionOverwrites: permissionOverwrites
            });

            await interaction.reply({ content: `✅ Sala criada: ${channel}\nEla será apagada automaticamente quando esvaziar.`, ephemeral: true });

            // Tenta mover o usuário para lá se ele estiver em call
            if (member.voice.channel) {
                await member.voice.setChannel(channel);
            }

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Erro ao criar sala. Verifique minhas permissões (Manage Channels).', ephemeral: true });
        }
    },
};
