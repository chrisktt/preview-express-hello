const config = require('config'); // https://github.com/lorenwest/node-config/wiki
const dbConfig = config.get('database');
dbConfig.uri = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.name}`;
console.log('PASSWORD: ', dbConfig.password);
const myuri = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.name}`;
console.log('myuri: ', myuri);

console.log('uri: ', dbConfig.uri);
dbConfig.password = 'GOTCHA';

console.log('final configuration: ', dbConfig);
const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect(dbConfig.uri, dbConfig.options);
        console.log(`Connected to database: ${dbConfig.name}`);
        return mongoose;
    } catch (error) {
        console.log('Failed to connect to database: ', error);
        return error;
    }
    console.log('database connection effort complete.');
}
exports.connectToDatabase = connectToDatabase;
