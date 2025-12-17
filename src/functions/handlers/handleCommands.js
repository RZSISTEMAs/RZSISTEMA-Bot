const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config();

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Comando: ${command.data.name} carregado`);
            }
        }

        const clientId = process.env.CLIENT_ID;
        const guildId = process.env.GUILD_ID;
        const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

        try {
            console.log('Iniciando atualização dos comandos de aplicativo (/).');

            // Se GUILD_ID estiver definido, registra apenas no servidor (mais rápido para dev)
            // Se não, registra globalmente (pode demorar até 1h)
            if (guildId) {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: client.commandArray },
                );
                console.log('Comandos de aplicativo (/) registrados no servidor local com sucesso.');
            } else {
                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: client.commandArray },
                );
                console.log('Comandos de aplicativo (/) registrados globalmente com sucesso.');
            }

        } catch (error) {
            console.error(error);
        }
    };
};
