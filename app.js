'use strict';
const config = require('config'); // https://github.com/lorenwest/node-config/wiki
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
        main(db);
    })
    .catch((err) => {
        console.log('Failed to connect to DB: ', err);
        main(db);
        process.exit();
    });

function main(db) {
    console.log('Program started');
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
        database: database.dbInfo(),
    };
    // assumes db is a mongoose handle
    // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
    let dbStatus = database.dbInfo().readyState;

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
