'use strict';

const db = require('./db');

module.exports = {
    getUsers: (requestedRole) => {
        return new Promise((fulfill, reject) => {
            let query = db.select('*').from('users');

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
