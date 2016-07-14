'use strict';

const nconf = require('nconf');
const environment = process.env.NODE_ENV || 'development';
const config = {
    development: {
        db: {
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'sam',
                database: 'devpostgres'
            }
        }
    },

    production: {
        db: {
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'sam',
                database: 'test'
            }
        }
    }
};

nconf.env()
    .defaults({
        db: config[environment].db,
        PORT: 3000
    });

module.exports = nconf;
