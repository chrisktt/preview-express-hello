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
        console.log('CONNECTING: ', dbConfig);
        await mongoose.connect(dbConfig.uri, dbConfig.options);
        console.log(`Connected to database: `, dbInfo());
        return mongoose;
    } catch (error) {
        console.log('Failed to connect to database: ', dbInfo(), error);
        return mongoose; // Let caller handle errors -- may want to retry
    }
}
exports.dbConnect = dbConnect;

// Helper: takes a connection returned by dbConnect and returns some useful info.
// https://mongoosejs.com/docs/api/connection.html#connection_Connection-db
function dbInfo(db) {
    db = db || mongoose; // use the global mongoose if none specified
    // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
    let readyState = db.connection.readyState;
    let readyDescriptor = ['disconnected', 'connected', 'connecting', 'disconnecting'][readyState];
    let { name, host, port, user } = db.connection;
    return { name, host, port, user, readyState, readyDescriptor };
}

exports.dbInfo = dbInfo;
