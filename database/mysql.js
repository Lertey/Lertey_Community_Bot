/**
                                __  __       ____   ___  _     
                                |  \/  |_   _/ ___| / _ \| |    
                                | |\/| | | | \___ \| | | | |    
                                | |  | | |_| |___) | |_| | |___ 
                                |_|  |_|\__, |____/ \__\_\_____|
                                        |___/                    
*/

const config = require('../config.json');
const chalk = require('chalk')
const { createConnection } = require('mysql');
const { Events } = require('discord.js');

let con = createConnection(config.mysql);


function mysqlConnect() {

    con.connect(err => {
        // Console log if there is an error
        if (err) return console.log(err);

        // No error found?
        console.log(chalk.bold(chalk.green(`MySQL has been connected!`)));
    });
}

// Создаём таблицу в базе данных с названием сервера
function createTable(guild_id) {
    console.log(guild_id)
    const createServerTable = `CREATE TABLE IF NOT EXISTS \`${guild_id}\`(
                \`id\` INT AUTO_INCREMENT PRIMARY KEY,
                \`user\` VARCHAR(255) NOT NULL,
                \`warns\` JSON DEFAULT NULL,
                \`lvl\` INT DEFAULT 0
            );`

    con.query(createServerTable, (error, results, fields) => {
        if (error) {
            console.log(error.message);
            return;
        }
    });
};

async function completeTable(user) {
    const completeServerTable = `SELECT * FROM \`${user.guild.id}\` WHERE \`user\`  = '${user.id}'`;

    try {
        const results = await con.query(completeServerTable);
        if (results.length == 0) {
            await con.query(`INSERT INTO \`${user.guild.id}\` (\`id\`, \`user\`, \`warns\`, \`lvl\` ) VALUES (NULL, '${user.id}', NULL, '0')`);
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { mysqlConnect, createTable, completeTable };