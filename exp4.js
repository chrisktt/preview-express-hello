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

// let prom = dbConnect(dbConfig_good);
let prom = dbConnect(dbConfig_bad);
prom.then(success).catch(fail).finally(console.log('FINALLY'));

console.log('GOT HERE');

async function dbConnect(dbConfig) {
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
        console.log(`Connected to database: `, dbInfo());
        const thenable = {
            then(resolve, reject) {
                resolve(result);
                // reject(errInfo);
            },
        };
        return thenable;
    } catch (error) {
        const errInfo = { ...dbInfo(mongoose), ...dbError(error) };
        console.log('Failed to connect to database: ', errInfo);
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

function success(value) {
    // value is a global mongoose on success
    console.log('SUCCESS');
    console.log('SUCCESS VALUE', dbInfo(value));
    main();
}

function fail(result) {
    console.log('FAILURE');
    // value is an error string on failure
    // console.log('FAILURE VALUE: ', value);
    // console.log('failure: ', dbInfo(db), err);
    console.log('FAIL VALUE: ', result);
    main();
}

function main() {
    console.log('ALL DONE');
    process.exit();
}

function dbInfo(db) {
    console.log('DB_INFO');
    db = db || mongoose; // use the global mongoose if none specified
    // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
    const { name, host, port, user, readyState } = db.connection;
    const readyDescriptor = db.STATES[readyState];
    return { name, host, port, user, readyState, readyDescriptor };
}

// Given a mongoose error, provide a summary
function dbError(err) {
    // console.log('DBERROR = ', err);
    const { ok, code, codeName } = err;
    return { ok, code, codeName };
}
