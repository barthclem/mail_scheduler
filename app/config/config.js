'use strict';
require('dotenv').config();
module.exports = {

    server: {
        app_port: process.env.APP_PORT
    },

    email: {
       gmail:{
           service: 'Gmail',
           username: process.env.USERNAME,
           authenticator: process.env.AUTHENTICATOR
       }

   },

    database: {
        mysql:{
            connection: {
                database: process.env.DATABASE_NAME,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASS,
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT
            },
            pool:{
                min: process.env.DATABASE_POOL_MIN,
                max: process.env.DATABASE_POOL_MAX
            }
        }
    }

};
