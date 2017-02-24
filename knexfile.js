// Update with your config settings.
let config = require('./app/config/config');

let dbConfig = {
    client: 'mysql',
    connection: config.database.mysql.connection,
    pool: config.database.mysql.pool,
    migrations: {
        tableName: 'mailer_migrations'
    }
};

module.exports = {

    development: dbConfig,

    staging: dbConfig,

    production: dbConfig

};
