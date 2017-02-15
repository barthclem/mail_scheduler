'use strict';
exports.up = function(knex) {
  return knex.schema.table('Events',(t)=>{
     t.timestamps();
  });
};

exports.down = function(knex) {
  
};
