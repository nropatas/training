'use strict';

const https = require('https');
const express = require('express');
const app = express();
const port = 3000;

// database
const knexfile = require('./knexfile');
const knex = require('knex')(knexfile.development);

app.get('/users(/:role)?', (req, res) => {

    let query = knex.select('*').from('users');

    if (req.params.role) {
        query.where({ role: req.params.role });
    }

    query.map((row) => {
        res.write(row.name + '\n');
    })
    .then(() => {
        res.end();
    })
    .catch(console.error);
});

app.get('/status', (req, out) => {
    let url = 'https://status.github.com/api/status.json';

    https.get(url, (res) => {
        res.on('data', (chunk) => {
            // console.log(JSON.parse(chunk));
            let json = JSON.parse(chunk);

            knex('status').insert({ status: json['status'], last_updated: json['last_updated'] })
                .then(() => {
                    out.write('A new status is recorded.');
                    out.end();
                })
                .catch(console.error);
        });
    });
});

app.get('/status/log', (req, res) => {
    knex.select('*')
        .from('status')
        .limit(10)
        .orderBy('last_updated', 'desc')
        .then((rows) => {
            res.type('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        })
        .catch(console.error);
});

app.listen(port, () => {
    console.log('Server started');
});
