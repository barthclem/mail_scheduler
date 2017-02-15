"use strict";
exports.up = function(knex, Promise) {
  return knex.schema.table('Events',(table)=>{
      table.string('creator').notNull();
      table.string('email').notNullable();
      table.integer('participants').unsigned();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('Events',(table)=>{
        table.dropColumn('creator');
        table.dropColumn('email');
        table.dropColumn('participants');
    });
};
