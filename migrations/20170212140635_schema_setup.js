let knex = require('../app/config/database');
exports.up = function(knex, Promise) {
    
  return  knex.schema.createTable('Events',(table)=>{
      table.increments('id');
      table.string('title');
      table.date('created_at');
      table.date('scheduled_at');
      })

     .createTable('Mailer_list',(table)=>{
    table.increments('id');
    table.integer('event_id').unsigned().references('Events.id');
    table.string('email');
    table.string('username');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Events')
         .dropTable('Mailer_list');
};
