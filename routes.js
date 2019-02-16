'use strict';

const express = require('express');
const router = express.Router();

const users = require('./controllers/users');
const status = require('./controllers/status');

const routes = [
    {
        path: '/users(/:role)?.json',
        handler: users.resJson,
    },

    {
        path: '/users(/:role)?(.html)?',
        handler: users.resHtml,
    },

    {
        path: '/status',
        handler: status.insert,
    },

    {
        path: '/status/log.json',
        handler: status.logJson,
    },

    {
        path: '/status/log(.html)?',
        handler: status.logHtml,
    },
];

routes.forEach((route) => {
    router.get(route.path, (req, res) => {
        route.handler(req, res);
    });
});

module.exports = router;
