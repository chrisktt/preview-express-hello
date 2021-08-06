// https://masteringjs.io/tutorials/mongoose/promise
// https://mongoosejs.com/docs/api.html
// https://mongoosejs.com/docs/promises.html
// https://mongoosejs.com/docs/connections.html

const uri =
    'mongodb://mikelX.leu:%40e$bu$17@portal-ssl1052-28.metropcs2017.aesbus.composedb.com:23865,portal-ssl977-29.metropcs2017.aesbus.composedb.com:23865/executiveDashboardDev';
const options = {
    tls: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const mongoose = require('mongoose');

let prom = mongoose.connect(uri, options);

prom.then(success).catch(fail).finally(console.log('FINALLY'));
console.log('GOT HERE');

function success(value) {
    // value is a global mongoose on success
    console.log('success', dbInfo(value));
    main();
}

function fail(value) {
    // value is an error string on failure
    // console.log('failed:', value);
    // console.log('failed:', value.codeName);
    // console.log('failed:', value['codeName']);

    // const { ok, code, codeName } = value;
    // console.log('failed:', { ok, code, codeName });

    const { ok, code, codeName } = value;

    console.log('failed:', codeName);
    // console.log({ ok, code, codeName });
    console.log(dbError(value));
    main();
}

function main() {
    console.log('STATES: ', mongoose.STATES);
    console.log('ALL DONE');
    process.exit();
}

function dbInfo(db) {
    db = db || mongoose; // use the global mongoose if none specified
    // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
    const { name, host, port, user, readyState } = db.connection;
    const readyDescriptor = db.connection.states[readyState];
    return { name, host, port, user, readyState, readyDescriptor };
}

// Given a mongoose error provide a summary
function dbError(err) {
    const summary = err;
    return err;
    const { ok, code, codeName } = err;

    return { ok, code, codeName };
}
