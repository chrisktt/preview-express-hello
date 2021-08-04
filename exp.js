'use strict';
const config = require('config'); // https://github.com/lorenwest/node-config/wiki
const dbConfig = config.get('database');

console.log('dbConfig = ', dbConfig);

const NODE_ENV = config.util.getEnv('NODE_ENV');
console.log(`NODE_ENV = ${NODE_ENV}`);

const database = require('./database.js');
process.exit();
database
    .connectToDatabase()
    .then((db) => {
        console.log(`GOT IT Connected to database: ${dbConfig.name}`);
        let dbStatus = db.connection.readyState;
        console.log(`dbStatus = ${dbStatus}`);
        // start();
        process.exit();
    })
    .catch((err) => {
        console.log('Failed to connect to DB: ', err);
        process.exit();
    });
