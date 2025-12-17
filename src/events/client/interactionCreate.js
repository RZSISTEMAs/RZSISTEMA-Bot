module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const command = commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'Algo deu errado ao executar este comando...',
                    ephemeral: true
                });
            }
        } 
        else if (interaction.isButton()) {
            // Tratamento genérico para botões ou passar para handler específico se crescer
            // Por enquanto, vamos emitir um evento customizado ou tratar direto no arquivo de comando se possível?
            // "Ticket" vai precisar ser tratado aqui ou em um arquivo separado.
            // Vamos adicionar um "emit" para facilitar ou verificar customId.
            
            // Para Jokenpo e outros jogos que usam collector local (awaitMessageComponent),
            // eles já capturam a interação lá, então não precisamos fazer nada aqui SE o collector estiver ativo.
            // Mas para Tickets (persistentes), precisamos tratar aqui.
            
            const { customId } = interaction;
            if (customId === 'open_ticket') {
                require('../../tickets/openTicket')(interaction, client);
            } else if (customId === 'close_ticket') {
                 require('../../tickets/closeTicket')(interaction, client);
            }
        }
        else if (interaction.isModalSubmit()) {
            const { customId } = interaction;
            if (customId === 'ticket_modal') {
                require('../../tickets/submitTicket')(interaction, client);
            }
        }
        else if (interaction.isUserContextMenuCommand()) {
             const { commands } = client;
             const command = commands.get(interaction.commandName);
             if (command) await command.execute(interaction, client);
        }
    },
};
