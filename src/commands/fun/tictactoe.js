const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('velha')
        .setDescription('Inicia um Jogo da Velha contra outro usuário.')
        .addUserOption(option => 
            option.setName('oponente')
                .setDescription('Quem você quer desafiar?')
                .setRequired(true)),
    async execute(interaction, client) {
        const opponent = interaction.options.getUser('oponente');
        
        if (opponent.bot) return interaction.reply({ content: 'Você não pode jogar contra bots (ainda)!', ephemeral: true });
        if (opponent.id === interaction.user.id) return interaction.reply({ content: 'Você não pode jogar contra si mesmo!', ephemeral: true });

        const initialBoard = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];

        let currentPlayer = interaction.user; // O desafiante começa

        const generateButtons = (board) => {
            const rows = [];
            for (let i = 0; i < 3; i++) {
                const row = new ActionRowBuilder();
                for (let j = 0; j < 3; j++) {
                    row.addComponents(
                        new ButtonBuilder()
                            .setCustomId(`tictactoe_${i}_${j}`)
                            .setLabel(board[i][j] === ' ' ? '-' : board[i][j])
                            .setStyle(board[i][j] === ' ' ? ButtonStyle.Secondary : (board[i][j] === 'X' ? ButtonStyle.Primary : ButtonStyle.Danger))
                            .setDisabled(board[i][j] !== ' ')
                    );
                }
                rows.push(row);
            }
            return rows;
        };

        const checkWin = (board) => {
            // Linhas, Colunas e Diagonais
            const lines = [
                // Linhas
                [board[0][0], board[0][1], board[0][2]],
                [board[1][0], board[1][1], board[1][2]],
                [board[2][0], board[2][1], board[2][2]],
                // Colunas
                [board[0][0], board[1][0], board[2][0]],
                [board[0][1], board[1][1], board[2][1]],
                [board[0][2], board[1][2], board[2][2]],
                // Diagonais
                [board[0][0], board[1][1], board[2][2]],
                [board[0][2], board[1][1], board[2][0]]
            ];

            for (const line of lines) {
                if (line[0] !== ' ' && line[0] === line[1] && line[1] === line[2]) {
                    return line[0];
                }
            }
            return null;
        };

        const checkDraw = (board) => {
             return board.flat().every(cell => cell !== ' ');
        };

        const msg = await interaction.reply({
            content: `❌ **${interaction.user.username}** vs ⭕ **${opponent.username}**\nVez de: ${currentPlayer}`,
            components: generateButtons(initialBoard),
            fetchReply: true
        });

        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

        collector.on('collect', async i => {
            // Verifica se é um dos jogadores
            if (i.user.id !== interaction.user.id && i.user.id !== opponent.id) {
                return i.reply({ content: 'Ei, esse jogo não é seu!', ephemeral: true });
            }

            // Verifica se é a vez do jogador correto
            if (i.user.id !== currentPlayer.id) {
                return i.reply({ content: 'Calma, não é sua vez!', ephemeral: true });
            }

            // Processa jogada
            const [_, row, col] = i.customId.split('_').map(Number);
            const symbol = currentPlayer.id === interaction.user.id ? 'X' : 'O';

            initialBoard[row][col] = symbol;

            const winner = checkWin(initialBoard);
            const draw = checkDraw(initialBoard);

            if (winner) {
                await i.update({
                    content: `🎉 **${currentPlayer.username}** venceu!`,
                    components: generateButtons(initialBoard).map(r => { r.components.forEach(b => b.setDisabled(true)); return r; })
                });
                collector.stop();
            } else if (draw) {
                await i.update({
                    content: `😐 Empate! Deu velha!`,
                    components: generateButtons(initialBoard).map(r => { r.components.forEach(b => b.setDisabled(true)); return r; })
                });
                collector.stop();
            } else {
                // Alterna turno
                currentPlayer = currentPlayer.id === interaction.user.id ? opponent : interaction.user;
                await i.update({
                    content: `❌ **${interaction.user.username}** vs ⭕ **${opponent.username}**\nVez de: ${currentPlayer}`,
                    components: generateButtons(initialBoard)
                });
            }
        });

        collector.on('end', (collected, reason) => {
             if (reason === 'time') {
                 interaction.editReply({ content: '⏰ Tempo esgotado! Jogo cancelado.', components: [] });
             }
        });
    },
};
