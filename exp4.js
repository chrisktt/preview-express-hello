// https://masteringjs.io/tutorials/mongoose/promise
// https://mongoosejs.com/docs/api.html
// https://mongoosejs.com/docs/promises.html
// https://mongoosejs.com/docs/connections.html

const mongoose = require('mongoose');

const dbConfig_good = {
    uri: 'mongodb://mikel.leu:%40e$bu$17@portal-ssl1052-28.metropcs2017.aesbus.composedb.com:23865,portal-ssl977-29.metropcs2017.aesbus.composedb.com:23865/executiveDashboardDev',
    options: {
        tls: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};

const dbConfig_bad = {
    uri: 'mongodb://mikel.leu:BAD_PASS@portal-ssl1052-28.metropcs2017.aesbus.composedb.com:23865,portal-ssl977-29.metropcs2017.aesbus.composedb.com:23865/executiveDashboardDev',
    options: {
        tls: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};

async function dbConnect(dbConfig) {
    try {
        console.log('CONNECTING: ', dbConfig);
        await mongoose.connect(dbConfig.uri, dbConfig.options);
        console.log(`Connected to database: `, dbInfo());
        return mongoose;
    } catch (error) {
        console.log('Failed to connect to database: ', { ...dbInfo(mongoose), ...dbError(error) });
        // What should we return here ?
        // Want to tell caller that database connection failed
        return false;
        return mongoose; // This looks like success to the caller
    }
}

// let prom = dbConnect(dbConfig_good);
let prom = dbConnect(dbConfig_bad);
prom.then(success).catch(fail).finally(console.log('FINALLY'));

console.log('GOT HERE');

function success(value) {
    // value is a global mongoose on success
    console.log('success', dbInfo(value));
    main();
}

function fail(value) {
    // value is an error string on failure

    console.log('failure: ', dbError(value));
    main();
}

function main() {
    console.log('ALL DONE');
    process.exit();
}

function dbInfo(db) {
    db = db || mongoose; // use the global mongoose if none specified
    // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
    const { name, host, port, user, readyState } = db.connection;
    const readyDescriptor = db.STATES[readyState];
    return { name, host, port, user, readyState, readyDescriptor };
}

// Given a mongoose error, provide a summary
function dbError(err) {
    const { ok, code, codeName } = err;
    return { ok, code, codeName };
}
