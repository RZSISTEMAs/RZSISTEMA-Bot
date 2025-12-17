module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {
        // Verifica se alguém SAIU de um canal (oldState.channel existe)
        if (oldState.channel) {
            const channel = oldState.channel;

            // Se o canal ficou vazio (0 membros)
            if (channel.members.size === 0) {
                // Verifica nomes/prefixos dos canais temporários
                // 🔒 = Privada
                // 📢 = Reunião
                if (channel.name.startsWith('🔒') || channel.name.startsWith('📢')) {
                    try {
                        // Delay curto para evitar exclusão acidental se alguém sair e entrar rápido
                        setTimeout(async () => {
                             // Verifica novamente se ainda está vazio e existe (fetch force para garantir cache atualizado)
                             const fChannel = await channel.fetch().catch(() => null);
                             if (fChannel && fChannel.members.size === 0) {
                                 await fChannel.delete();
                                 console.log(`Canal temporário ${fChannel.name} excluído por inatividade.`);
                             }
                        }, 5000); // 5 segundos de tolerância
                    } catch (err) {
                        console.error("Erro ao deletar canal de voz temporário:", err);
                    }
                }
            }
        }
    },
};
