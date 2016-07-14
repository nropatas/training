'use strict';

const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

module.exports = {
    getUsers: (requestedRole) => {
        return new Promise((fulfill, reject) => {
            let query = knex.select('*').from('users');

            if (requestedRole) {
                query.where({ role: requestedRole });
            }

            query.then((rows) => {
                fulfill(rows);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    }
};
