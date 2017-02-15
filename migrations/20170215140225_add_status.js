'use strict';
let constants = require('../app/config/constants');
exports.up = function(knex) {
  return knex.schema.table('Events',(table)=>{
      table.enu('status',constants.events.status);
  });
};

exports.down = function(knex) {
  return knex.schema.table('Events',(table)=>{
     table.dropColumn('status');
  });
};
