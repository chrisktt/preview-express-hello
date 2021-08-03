const config = require('config'); // https://github.com/lorenwest/node-config/wiki
const dbConfig = config.get('database');

// console.log(dbConfig);
const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect(dbConfig.uri, dbConfig.options);
        console.log(`Connected to database: ${dbConfig.name}`);
        return mongoose;
    } catch (error) {
        console.log('Failed to connect to DB: ', err);
    }
    console.log('database connection effort complete.');
}
exports.connectToDatabase = connectToDatabase;
