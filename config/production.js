// https://github.com/lorenwest/node-config/wiki
const defer = require('config/defer').deferConfig;

const config = {
    // Production database
    database: {
        name: 'executiveDashboard',
        user: 'subseaAdmin',
        // password: 'lqWe4*nSd',
        password: 'SECRET',
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

module.exports = config;
