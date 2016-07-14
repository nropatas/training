'use strict';

const model = require('../models/status');
const https = require('https');
let status;

status.prototype.insert = (req, out) => {
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
};

status.prototype.logJson = (req, res) => {
    model.getLog()
        .then((rows) => {
            res.type('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        })
        .catch(console.error);
};

status.prototype.logHtml = (req, res) => {
    model.getLog()
        .then((rows) => {
            res.render('log', { data: rows });
        })
        .catch(console.error);
};

module.exports = status;
