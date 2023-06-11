const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check bot ping'),
    async execute(interaction) {
        await interaction.reply(`Pong! ` + (Date.now() - interaction.createdTimestamp) + `ms`)
    }
}