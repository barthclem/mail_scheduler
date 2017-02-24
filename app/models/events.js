'use strict';

let bookshelf = require('../bookshelf');
let MailerList = require('./mailer_list');

let Events = bookshelf.Model.extend({
    tableName: 'Events',
    hasTimeStamps: true,

    mailerList: function () {
        return this.hasMany(MailerList, 'event_id', 'id');
    }
});

module.exports = bookshelf.model('Events', Events);
