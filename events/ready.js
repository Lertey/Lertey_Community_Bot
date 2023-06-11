const { Events } = require('discord.js');
const chalk = require('chalk');
const { mysqlConnect, createTable, completeTable } = require('../database/mysql.js');



module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(chalk.magenta(`Ready! Logged in as ${client.user.tag}`))
        mysqlConnect()

        client.guilds.cache.forEach(guild => {
            createTable(guild.id)
            guild.members.cache.forEach(member => {
                setInterval(async () => await completeTable(member), 3000)
            })
        })
    }
}