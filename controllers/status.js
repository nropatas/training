'use strict';

const model = require('../models/status');
const https = require('https');

module.exports.controller = (app) => {
    app.get('/status', (req, out) => {
        let url = 'https://status.github.com/api/status.json';

        https.get(url, (res) => {
            res.on('data', (chunk) => {
                let json = JSON.parse(chunk);

                model.insertNewStatus(json)
                    .then(() => {
                        out.write('A new status is recorded.');
                        out.end();
                    })
                    .catch(console.error);
            });
        });
    });

    app.get('/status/log.json', (req, res) => {
        model.getLog().then((rows) => {
            res.type('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        })
        .catch(console.error);
    });

    app.get('/status/log(.html)?', (req, res) => {
        model.getLog().then((rows) => {
            res.render('log', { data: rows });
        })
        .catch(console.error);
    });
};
