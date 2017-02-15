'use strict';

let knex = require ('./config/database');

let bookshelf = require ('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('bookshelf-soft-delete');

module.exports = bookshelf;
