'use strict';
const config = require('config'); // https://github.com/lorenwest/node-config/wiki
process.env.NODE_ENV = config.util.getEnv('NODE_ENV');

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

console.log(sayEnv('NODE_ENV'));
// console.log(sayEnv('APP_NAME'));
// console.log(sayEnv('DB_NAME'));
// console.log(sayEnv('DB_URI'));

const database = require('./database.js');
database
    .dbConnect()
    .then((db) => {
        main(db);
        // console.log('Still running');
        // process.exit();
    })
    .catch((err) => {
        console.log('Shutting down');
        process.exit();
    });

function main(db) {
    console.log('Program started');
    console.log('DATABASE STATUS = ', db.connection.readyState);
}

app.get('/', (req, res) =>
    res.send(
        'Hello there! <br> V 105' +
            '<br>hash = ' +
            (process.env.RENDER_GIT_COMMIT || '').substring(0, 7) +
            ''
    )
);

app.get('/app_status', (req, res) => {
    let envStatus = {
        node_env: process.env.NODE_ENV || '',
        app_hash: (process.env.RENDER_GIT_COMMIT || '').substring(0, 7),
        database: database.dbInfo(),
    };
    // state 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
    let readyState = database.dbInfo().readyState;
    // return 200 for 1,2 and 500 for 0,3
    let httpStatus = [500, 200, 200, 500][readyState];
    // http://expressjs.com/en/api.html#res.status
    return res.status(httpStatus).json(envStatus);
});

app.listen(port, () => console.log(`App listening on port http://localhost:${port} !`));

function sayEnv(varname) {
    return `${varname} = ` + eval(`process.env.${varname}`);
}
