// https://github.com/lorenwest/node-config/wiki
const defer = require('config/defer').deferConfig;

const config = {
    // Default mongo database
    database: {
        name: 'a_database_name',
        user: 'a_database_user',
        password: 'a_database_password',
        host: 'a_database_host',
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
