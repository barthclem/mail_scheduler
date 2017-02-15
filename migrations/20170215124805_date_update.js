'use strict';
exports.up = function(knex) {
  knex.schema.raw('ALTER TABLE Events Modify scheduled_at datetime');
    knex.schema.raw('ALTER TABLE Events Modify created_at datetime');
};

exports.down = function(knex) {
    knex.schema.raw('ALTER TABLE Events Modify scheduled_at date');
    knex.schema.raw('ALTER TABLE Events Modify created_at date');
};
