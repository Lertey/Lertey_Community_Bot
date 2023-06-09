const path = require('node:path')
const fs = require('node:fs')
const { REST, Routes, Guild } = require('discord.js');
const config = require('./config.json');
const { Client, Collection, Events, IntentsBitField } = require('discord.js')
const chalk = require('chalk')

const myIntents = new IntentsBitField()
	.add(
		IntentsBitField.Flags.GuildPresences,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages);

const client = new Client({
	intents: myIntents
});

// COMMANDS
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(chalk.red(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`))
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(config.client.token)


module.exports = { client };
