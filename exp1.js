const config = require('config'); // https://github.com/lorenwest/node-config/wiki
const dbConfig = config.get('database');

const NODE_ENV = config.util.getEnv('NODE_ENV');
console.log(`NODE_ENV = ${NODE_ENV}`);
console.log(dbConfig);

const mongoose = require('mongoose');

mongoose
    .connect(dbConfig.uri, dbConfig.options)
    .then(() => {
        console.log(`Connected to database: ${dbConfig.name}`);
        // start();
        process.exit();
    })
    .catch((err) => {
        console.log('Failed to connect to DB: ', err);
        process.exit();
    });
