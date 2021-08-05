const config = require('config'); // https://github.com/lorenwest/node-config/wiki
const dbConfig = config.get('database');
const mongoose = require('mongoose');

// https://docs.mongodb.com/manual/reference/connection-string/#std-label-connections-connection-options
// https://mongoosejs.com/docs/connections.html
// https://mongoosejs.com/docs/connections.html#multiple_connections
// https://stackoverflow.com/questions/22950282/mongoose-schema-vs-model/22950402#22950402
// https://masteringjs.io/tutorials/mongoose/mongoose-connect-async
// https://attacomsian.com/blog/mongoose-connect-async-await
// https://stackoverflow.com/questions/40818016/connect-vs-createconnection
async function dbConnect() {
    try {
        await mongoose.connect(dbConfig.uri, dbConfig.options);
        console.log(`Connected to database: ${dbConfig.name}`);
        return mongoose;
    } catch (error) {
        console.log('Failed to connect to database: ', error);
        return mongoose; // Let caller handle errors
    }
}
exports.dbConnect = dbConnect;

// Helper: takes a connection returned by dbConnect and returns some useful info.
// https://mongoosejs.com/docs/api/connection.html#connection_Connection-db
exports.dbInfo = function (db) {
    db = db || mongoose;
    let conn = db.connections[0];
    let { name, host, port, user } = conn;
    return { name, host, port, user };
};
