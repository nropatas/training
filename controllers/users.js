'use strict';

const model = require('../models/users');

module.exports.controller = (app) => {
    app.get('/users(/:role)?.json', (req, res) => {
        model.getUsers(req.params.role)
            .then((rows) => {
                res.type('application/json');
                res.write(JSON.stringify(rows));
                res.end();
            })
            .catch(console.error);
    });

    app.get('/users(/:role)?(.html)?', (req, res) => {
        model.getUsers(req.params.role)
            .then((rows) => {
                res.render('users', { data: rows });
            })
            .catch(console.error);
    });
};
