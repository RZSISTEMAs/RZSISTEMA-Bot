const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lista todos os comandos disponíveis e organizados.'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('📚 Central de Ajuda - RZSISTEMA App')
            .setDescription('Aqui estão todos os comandos que você pode usar, organizados por categoria.')
            .setColor('Gold')
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: 'Use /comando para executar uma ação' });

        // Ler as pastas de comandos para criar as categorias
        const commandsPath = path.join(__dirname, '..', '..', 'commands');
        const commandFolders = fs.readdirSync(commandsPath);

        const emojis = {
            'utility': '🛠️',
            'moderation': '🛡️',
            'fun': '🎲',
            'default': '📂'
        };

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'));
            
            // Capitalizar nome da categoria
            const categoryName = folder.charAt(0).toUpperCase() + folder.slice(1);
            const categoryEmoji = emojis[folder] || emojis['default'];

            const commandList = commandFiles.map(file => {
                const command = require(path.join(commandsPath, folder, file));
                // Context Menus não têm descrição, então definimos uma manual ou indicamos o tipo
                const desc = command.data.description || '*(Menu de Contexto - Clique Direito)*';
                const prefix = command.data.description ? '/' : ''; // Só usa / se for chat input
                return `**${prefix}${command.data.name}**: ${desc}`;
            });

            if (commandList.length > 0) {
                embed.addFields({ 
                    name: `${categoryEmoji} ${categoryName}`, 
                    value: commandList.join('\n'), 
                    inline: false 
                });
            }
        }

        await interaction.reply({ embeds: [embed] });
    },
};
