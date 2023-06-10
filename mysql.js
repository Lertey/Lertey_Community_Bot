const { createConnection } = require('mysql');
const config = require('./config.json');
const chalk = require('chalk')
const  {Client} = require('discord.js');

const tableToCheck = `${client.guilds.cache.first().name}`
console.log(tableToCheck)


let con = createConnection(config.mysql);

con.connect(err => {
    // Console log if there is an error
    if (err) return console.log(err);

    // No error found?
    console.log(chalk.bold(chalk.green(`MySQL has been connected!`)));
});

const query = `SHOW TABLES LIKE '${tableToCheck}'`;