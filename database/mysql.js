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


const { id, displayName } = require('../events/ready.js')

function mysqlConnect() {
    let con = createConnection(config.mysql);

    con.connect(err => {
        // Console log if there is an error
        if (err) return console.log(err);

        // No error found?
        console.log(chalk.bold(chalk.green(`MySQL has been connected!`)));
    });

    const query = `SHOW TABLES LIKE '${global.tableToCheck}'`;

    con.query(query, (error, results, fields) => {
        // Если возникает ошибка, выводим ее
        if (error) {
            console.log(error.message);
            return;
        }

        // Если результаты пустые, создаем таблицу
        if (results.length === 0) {
            const createTableQuery = `CREATE TABLE ${global.tableToCheck} (
                name VARCHAR(255),
                lvl INT DEFAULT 0,
                warns INT DEFAULT 0
              )`;

            const insertQuery = `INSERT INTO ${global.tableToCheck} (id, name) VALUES (${id}, '${displayName}')`; // Создаем SQL-запрос для вставки данных пользователя
            con.query(insertQuery, (error, results, fields) => {
                if (error) {
                    console.error(error);
                    return;
                }
                console.log(`User ${displayName} with ID ${id} added to the database!`);
            });

            con.query(createTableQuery, insertQuery, (error, results, fields) => {
                if (error) {
                    console.log(error.message);
                    return;
                }
                console.log(chalk.green(`Table ${global.tableToCheck} was successfully created!`));
            });
        } else {
            console.log(chalk.blue(`Table ${global.tableToCheck} already exists.`));
        }
    });
}




function test() {
    console.log(global.tableToCheck)
}

module.exports = { mysqlConnect };