'use strict';

let config = require('./config');

let dbConfig = {
    connection: config.database.mysql.connection,
    pool:  config.database.mysql.pool,
    client: 'mysql'
};

let knex = require('knex')(dbConfig);

module.exports = knex;
