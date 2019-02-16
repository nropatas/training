'use strict';

const model = require('../models/users');

function users () {}

users.prototype.resJson = (req, res) => {
    model.getUsers(req.params.role)
        .then((rows) => {
            res.type('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        })
        .catch(console.error);
};

users.prototype.resHtml = (req, res) => {
    model.getUsers(req.params.role)
        .then((rows) => {
            res.render('users', { data: rows });
        })
        .catch(console.error);
};

module.exports = new users();
