// https://github.com/lorenwest/node-config/wiki
const defer = require('config/defer').deferConfig;
const config = {
    // Development database
    database: {
        name: 'executiveDashboardDev',
        user: 'mikel.leu',
        password: 'THIS-IS-A-SECRET',
        // password: '%40e$bu$17',
        host: 'portal-ssl1052-28.metropcs2017.aesbus.composedb.com:23865,portal-ssl977-29.metropcs2017.aesbus.composedb.com:23865',
        options: {
            tls: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: false,
        },
        uri: defer(function () {
            // must use function() to set value for "this" (it's javascript)
            return `mongodb://${this.database.user}:${this.database.password}@${this.database.host}/${this.database.name}`;
        }),
    },
};

// const db = config.database;
// db.uri = `mongodb://${db.user}:${db.password}@${db.host}/${db.name}`;
// console.log('development: setting uri:', db.uri);

module.exports = config;
