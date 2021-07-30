const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// https://docs.mongodb.com/manual/reference/connection-string/#std-label-connections-connection-options
// https://mongoosejs.com/docs/connections.html
// https://mongoosejs.com/docs/connections.html#multiple_connections
// https://stackoverflow.com/questions/22950282/mongoose-schema-vs-model/22950402#22950402
// https://masteringjs.io/tutorials/mongoose/mongoose-connect-async
// https://attacomsian.com/blog/mongoose-connect-async-await
// https://stackoverflow.com/questions/40818016/connect-vs-createconnection

// Options passed through the URI seem to be ignored, so include them here
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true, tls: true };
mongoose
    .connect(process.env.DB_URI, dbOptions)
    .then(() => {
        console.log(`Connected to database: ${process.env.DB_NAME}`);
        start();
    })
    .catch((err) => {
        console.log('Failed to connect to DB', err);
    });

function start() {
    console.log('Program started');
}

app.get('/', (req, res) =>
    res.send(
        'Hello there! <br> V 103' +
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
