// https://github.com/lorenwest/node-config/wiki
const config = {
    // Development database
    database: {
        name: 'executiveDashboardDev',
        user: 'mikel.leu',
        password: '%40e$bu$17',
        host: 'portal-ssl1052-28.metropcs2017.aesbus.composedb.com:23865,portal-ssl977-29.metropcs2017.aesbus.composedb.com:23865',
        options: {
            tls: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: false,
        },
    },
};

const db = config.database;
db.uri = `mongodb://${db.user}:${db.password}@${db.host}/${db.name}`;

module.exports = config;
