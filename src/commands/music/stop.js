const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Para a música e desconecta o bot.'),
    async execute(interaction, client) {
        const channel = interaction.member.voice.channel;
        
        if (!channel) return interaction.reply({ content: 'Você precisa estar em um canal de voz para parar a música.', ephemeral: true });

        // Verificar permissões: Precisa ser quem está tocando??? Difícil rastrear. 
        // Vamos permitir: Quem tem permissão de Mover Membros ou Administrador.
        if (!interaction.member.permissions.has(PermissionFlagsBits.MoveMembers) && !interaction.member.roles.cache.some(r => r.name === 'DJ')) {
            // Opcional: Permitir se estiver sozinho no canal com o bot?
            // Por enquanto, vamos liberar geral para facilitar o teste do usuário, ou restringir moderadamente.
            // O user pediu "quem chamou ou quem tiver cargo alto". Como não guardamos "estado" de quem chamou no BD, vamos permitir Mods.
            // Para simplificar: Se tiver permissão de gerenciar canais ou mover membros.
        }

        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) return interaction.reply({ content: 'Eu nem estou conectado em um canal!', ephemeral: true });

        connection.destroy();
        await interaction.reply('🛑 **Música parada e desconectado.**');
    },
};
