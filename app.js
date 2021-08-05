'use strict';
const config = require('config'); // https://github.com/lorenwest/node-config/wiki
process.env.NODE_ENV = config.util.getEnv('NODE_ENV');
// const dbConfig = config.get('database');

// console.log('dbConfig = ', dbConfig);

// const NODE_ENV = config.util.getEnv('NODE_ENV');
process.env.NODE_ENV = config.util.getEnv('NODE_ENV');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

console.log(sayEnv('APP_NAME'));
console.log(sayEnv('NODE_ENV'));
console.log(sayEnv('DB_NAME'));
console.log(sayEnv('DB_URI'));

const database = require('./database.js');
database
    .dbConnect()
    .then((db) => {
        // console.log(`GOT IT Connected to database: ${dbConfig.name}`);
        console.log(`GOT IT Connected to database: `);
        let dbStatus = db.connection.readyState;
        console.log(`dbStatus = ${dbStatus}`);
        main(db);
        process.exit();
    })
    .catch((err) => {
        console.log('Failed to connect to DB: ', err);
        main(db);
        process.exit();
    });

function main(db) {
    console.log('Program started');
    // console.log('mongoose connection: ', db.connections);
    const connection = db.connections[0];
    // console.log('mongoose INFO: ', connection.pass);
    // let dbinfo = connection.name;
    // let { name, host, port, user } = connection;
    // console.log('mongoose INFO: ', database.dbInfo(db));
    console.log('mongoose INFO: ', database.dbInfo());

    // console.log('mongoose INFO: ', dbInfo(connection));
    // console.log('mongoose NAME: ', name);
    // console.log('mongoose INFO: ', connection);
}

function dbInfo(db) {
    let conn = db.connections[0];
    let { name, host, port, user } = conn;
    console.log('OPTIONS ', conn.options);
    return { name, host, port, user };
}

function dbInfo2({ name, host, port, user }) {
    return { name, host, port, user };
}

app.get('/', (req, res) =>
    res.send(
        'Hello there! <br> V 104' +
            '<br>hash = ' +
            (process.env.RENDER_GIT_COMMIT || '').substring(0, 7) +
            ''
    )
);

app.get('/app_status', (req, res) => {
    // http://expressjs.com/en/api.html#res.status
    let envStatus = {
        node_env: process.env.NODE_ENV || '',
        app_hash: (process.env.RENDER_GIT_COMMIT || '').substring(0, 7),
        db_name: process.env.DB_NAME || '',
        db_server: process.env.DB_SERVER || '',
    };
    // assumes db is a mongoose handle
    // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
    let dbStatus = mongoose.connection.readyState;
    switch (dbStatus) {
        case 0:
            return res.status(500).json({ db_status: 'disconnected', ...envStatus });
        case 1:
            return res.status(200).json({ db_status: 'connected', ...envStatus });
        case 2:
            return res.status(200).json({ db_status: 'connecting', ...envStatus });
        case 3:
            return res.status(500).json({ db_status: 'disconnecting', ...envStatus });
    }
});

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port} !`));

function sayEnv(varname) {
    return `${varname} = ` + eval(`process.env.${varname}`);
}
