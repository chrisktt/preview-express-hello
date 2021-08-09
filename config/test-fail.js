// https://github.com/lorenwest/node-config/wiki

const config = {
    // TEST FAIL: set a bogus user so connection will fail for testing purpose
    database: {
        name: 'executiveDashboardDev',
        user: 'FAKE',
        host: 'portal-ssl1052-28.metropcs2017.aesbus.composedb.com:23865,portal-ssl977-29.metropcs2017.aesbus.composedb.com:23865',
        options: {},
    },
};

module.exports = config;
