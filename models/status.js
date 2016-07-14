'use strict';

const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

module.exports = {
    getLog: () => {
        return new Promise((fulfill, reject) => {
            knex.select('*')
                .from('status')
                .limit(10)
                .orderBy('last_updated', 'desc')
                .then((rows) => {
                    fulfill(rows);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    insertNewStatus: (jsonData) => {
        return new Promise((fulfill, reject) => {
            knex('status').insert({ status: jsonData['status'], last_updated: jsonData['last_updated'] })
                .then(() => {
                    fulfill();
                })
                .catch(reject);
        });
    },
};
