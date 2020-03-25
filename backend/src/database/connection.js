const knex = require('knex');
const configuration = require('../../knexfile')
require('dotenv').config();

const db_params = configuration[process.env.APP_ENV];
module.exports = knex(db_params);