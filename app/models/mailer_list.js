'use strict';

let bookshelf = require('../bookshelf');

let Events = require('./events');

let MailerList = bookshelf.Model.extend({
    tableName: 'Mailer_list',

    events: function () {
        return this.belongsTo(Events);
    }
});

module.exports = bookshelf.model('Mailer_list', MailerList);
