'use strict';

const port = 3000;

const https = require('https');
const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// database
const knexfile = require('./knexfile');
const knex = require('knex')(knexfile.development);

function getLog () {
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
}

function getUsers (requestedRole) {
    return new Promise((fulfill, reject) => {
        let query = knex.select('*').from('users');

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

app.get('/users(/:role)?.json', (req, res) => {
    getUsers(req.params.role)
        .then((rows) => {
            res.type('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        })
        .catch(console.error);
});

app.get('/users(/:role)?(.html)?', (req, res) => {

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

app.get('/status/log.json', (req, res) => {
    getLog().then((rows) => {
        res.type('application/json');
        res.write(JSON.stringify(rows));
        res.end();
    })
    .catch(console.error);
});

app.get('/status/log(.html)?', (req, res) => {
    getLog().then((rows) => {
        console.log(rows);
        res.render('log', { data: rows });
    })
    .catch(console.error);
});

app.listen(port, () => {
    console.log('Server started');
});
