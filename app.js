const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// const dbUser =
// const dbPass =
// const dbConnStr = "mongodb://portal-ssl2830-17.mcare-2018.3038111348.composedb.com:17892,portal-ssl2952-18.mcare-2018.3038111348.composedb.com:17892/mlearnTest?ssl=true"
const dbConnStr = `mongodb://aXelFoleY:b3v3rlyHi77s*C0p@portal-ssl2194-11.mpcssurveys18.3038111348.composedb.com:16918,portal-ssl2470-10.mpcssurveys18.3038111348.composedb.com:16918/surveys-test?ssl=true`;
// https://docs.mongodb.com/manual/reference/connection-string/#std-label-connections-connection-options
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// https://mongoosejs.com/docs/connections.html
// https://mongoosejs.com/docs/connections.html#multiple_connections
// https://stackoverflow.com/questions/22950282/mongoose-schema-vs-model/22950402#22950402
// https://masteringjs.io/tutorials/mongoose/mongoose-connect-async
// https://attacomsian.com/blog/mongoose-connect-async-await
// https://stackoverflow.com/questions/40818016/connect-vs-createconnection
mongoose
    .connect(dbConnStr, dbOptions)
    .then(() => start())
    .catch((err) => {
        console.log('Failed to connect to DB', err);
    });

function start() {
    console.log('Program started');
}

console.log('db status = ', JSON.stringify(dbStatus(dbConnStr)));

app.get('/', (req, res) =>
    res.send(
        'Hello there! <br> V 102' +
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

// Use heuristics to determine the hash code of the source code
function appHash() {
    // https://devcenter.heroku.com/changelog-items/630
}

/**********
// connect database, setup options in db.js
mongoose.connect(dbConnStr, {useNewUrlParser: true, useUnifiedTopology: true}, (err, response) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Database connection ready");
})
 */

// Determine the status of the database connection
function dbStatus(dbConnStr) {
    // https://docs.mongodb.com/manual/reference/command/connectionStatus/
    // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
    const mongoose = require('mongoose');
    mongoose.connect(dbConnStr, { useNewUrlParser: true, useUnifiedTopology: true });
    return mongoose.connection.readyState;
}

/*******************************************************
var mongoose = require('mongoose');

module.exports = function(config, options) {
	var db;

	return {
		connection: db,
		init: callback => {
			// console.log('connecting to', config.db.urlNew)
			// mongoose.connect(config.db.url, config.db.options)
			// db = mongoose.connection
			// db.on('error', console.error.bind(console, 'connection error...'))
			// db.once('open', callback)

			mongoose.Promise = global.Promise;
			var promise = mongoose.connect(
				config.db.urlNew,
				options
			);

			promise
				.then(_db => {
					console.log('connected to db :)');

					db = _db;
					callback();
				})
				.catch(err => {
					console.log('error conn to db', err);
				});
		},
	};
};
*******************************************************/
