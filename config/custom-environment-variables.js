// https://github.com/lorenwest/node-config/wiki/Environment-Variables#custom-environment-variables

console.log('got here custom');

const config = {
    database: {
        password: 'DB_PASSWORD',
    },
};

// var db = require('config').get('database');
// db.uri = `mongodb://${db.user}:${db.password}@${db.host}/${db.name}`;

module.exports = config;
