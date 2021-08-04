// https://github.com/lorenwest/node-config/wiki
const defer = require('config/defer').deferConfig;

defer(() => {
    console.log('got here defer');
});

console.log('got here production');
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
            return `mongodb://${this.database.user}:${this.database.password}@${this.database.host}/${this.database.name}`;
        }),
        // uri: `mongodb://${this.user}:${this.password}@${this.host}/${this.name}`,
    },
};

// const db = cfg.database;
// const db = config.database;
// db.uri = `mongodb://${db.user}:${db.password}@${db.host}/${db.name}`;

// db.uri = defer(() => {
//     return `mongodb://${db.user}:${db.password}@${db.host}/${db.name}`;
// });

// module.exports = defer(() => {
//     return config;
// });

module.exports = config;
// defer(() => {
//     console.log('got here');
//     db.uri = `mongodb://${db.user}:${db.password}@${db.host}/${db.name}`;
//     return (module.exports = config);
// });
