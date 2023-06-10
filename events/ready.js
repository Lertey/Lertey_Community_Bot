const { Events } = require('discord.js');
const chalk = require('chalk');
const { mysqlConnect } = require('../database/mysql.js');

global.tableToCheck = "Нет вызова ready";

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        global.tableToCheck = client.guilds.cache.first()?.name ?? "Вызов ready был, но нет гильдии";
        console.log(chalk.magenta(`Ready! Logged in as ${client.user.tag}`))

        
        // mysqlConnect()
    },
};