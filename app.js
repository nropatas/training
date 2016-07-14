'use strict';

const port = 3000;

const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use('/public', express.static('public'));

app.use('/', require('./routes'));

app.listen(app.get('port'), () => {
    console.log('Server started');
});
