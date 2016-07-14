'use strict';

const model = require('../models/users');

module.exports = {
    resJson: (req, res) => {
        model.getUsers(req.params.role)
            .then((rows) => {
                res.type('application/json');
                res.write(JSON.stringify(rows));
                res.end();
            })
            .catch(console.error);
    },

    resHtml: (req, res) => {
        model.getUsers(req.params.role)
            .then((rows) => {
                res.render('users', { data: rows });
            })
            .catch(console.error);
    },
};
