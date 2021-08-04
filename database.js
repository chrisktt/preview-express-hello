const config = require('config'); // https://github.com/lorenwest/node-config/wiki
const dbConfig = config.get('database');
const mongoose = require('mongoose');

async function connectToDatabase() {
    // https://docs.mongodb.com/manual/reference/connection-string/#std-label-connections-connection-options
    // https://mongoosejs.com/docs/connections.html
    // https://mongoosejs.com/docs/connections.html#multiple_connections
    // https://stackoverflow.com/questions/22950282/mongoose-schema-vs-model/22950402#22950402
    // https://masteringjs.io/tutorials/mongoose/mongoose-connect-async
    // https://attacomsian.com/blog/mongoose-connect-async-await
    // https://stackoverflow.com/questions/40818016/connect-vs-createconnection

    try {
        await mongoose.connect(dbConfig.uri, dbConfig.options);
        console.log(`Connected to database: ${dbConfig.name}`);
        return mongoose;
    } catch (error) {
        console.log('Failed to connect to database: ', error);
        return mongoose; // Let caller handle errors
    }
}
exports.connectToDatabase = connectToDatabase;
