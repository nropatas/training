'use strict';

const db = require('./db');

module.exports = {
    getLog: () => {
        return new Promise((fulfill, reject) => {
            db.select('*')
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
            db('status').insert({ status: jsonData['status'], last_updated: jsonData['last_updated'] })
                .then(() => {
                    fulfill();
                })
                .catch(reject);
        });
    },
};
