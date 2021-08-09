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
    // We want this to mimick:
    //      return await mongoose.connect(dbConfig.uri, dbConfig.options);
    // But we also want to do some logging and better error checking
    // so we have to return "thenable" to mimick the promise returned by connect
    // https://masteringjs.io/tutorials/fundamentals/thenable
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#thenable_objects
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
    // https://blog.ashleygrant.com/2020/04/30/resolved-javascript-promises-can-be-used-multiple-times/
    // https://javascript.plainenglish.io/the-benefit-of-the-thenable-object-in-javascript-78107b697211

    try {
        const result = await mongoose.connect(dbConfig.uri, dbConfig.options);
        console.log(`Connected to database: `, JSON.stringify(dbInfo()));
        const thenable = {
            then(resolve, reject) {
                resolve(result);
                // reject(errInfo);
            },
        };
        return thenable;
    } catch (error) {
        const errInfo = { ...dbInfo(mongoose), ...dbError(error) };
        console.log('Failed to connect to database: ', JSON.stringify(errInfo));
        // What should we return here ?
        // Want to tell caller that database connection failed
        const thenable = {
            then(resolve, reject) {
                // resolve(result);
                reject(errInfo);
            },
        };
        return thenable;
    }
}
exports.dbConnect = dbConnect;

// Helper: takes a connection returned by dbConnect and returns some useful info.
// https://mongoosejs.com/docs/api/connection.html#connection_Connection-db
function dbInfo(db) {
    db = db || mongoose; // use the global mongoose if none specified
    // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
    const { name, host, port, user, readyState } = db.connection;
    const readyDescriptor = db.STATES[readyState];
    return { name, host, port, user, readyState, readyDescriptor };
}
exports.dbInfo = dbInfo;

// Given a mongoose error, provide a summary
function dbError(err) {
    const { ok, code, codeName } = err;
    return { ok, code, codeName };
}
exports.dbError = dbError;
