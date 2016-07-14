'use strict';

const port = 3000;

const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use('/public', express.static('public'));

fs.readdirSync('./controllers').forEach((file) => {
    if (path.extname(file) === '.js') {
        let route = require('./controllers/' + file);
        route.controller(app);
    }
});

app.listen(app.get('port'), () => {
    console.log('Server started');
});
