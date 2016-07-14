'use strict';

const config = require('./config');
const path = require('path');
const express = require('express');
const app = express();

app.set('port', config.get('PORT'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use('/public', express.static('public'));

app.use('/', require('./routes'));

app.listen(app.get('port'), () => {
    console.log('Server started at http://localhost:' + config.get('PORT'));
});
