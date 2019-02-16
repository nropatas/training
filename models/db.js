'use strict';

const config = require('../config');
const knex = require('knex')(config.get('db'));

module.exports = knex;
