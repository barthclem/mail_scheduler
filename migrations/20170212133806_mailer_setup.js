'use strict';

exports.up = function (knex) {
    return knex.schema.createTableIfNotExists('user', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('email');
        table.integer('role_id').unsigned().references('id').inTable('role');
    })

        .createTableIfNotExists('organizer', (table) => {
            table.increments('id').primary();
            table.string('username').default('');
            table.integer('user_id').unsigned().references('id').inTable('user');
        })

        .createTableIfNotExists('participant', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().references('id').inTable('user');
        })

        .createTableIfNotExists('role', (table) => {
            table.increments('id').primary();
            table.string('title');
        })

        .createTableIfNotExists('role_permission', (table) => {
            table.increments('id').primary();
            table.integer('role_id').unsigned().references('id').inTable('role');
            table.integer('permission_id').unsigned().references('id').inTable('permission');
        })

        .createTableIfNotExists('permission', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
        })

        .createTableIfNotExists('quix', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable().unique();
            table.string('link').unique();
            table.date('scheduled_at');
            table.integer('organizer_id').unsigned().references('id').inTable('organizer');
            table.timestamps();
        })

        .createTableIfNotExists('quix_participants', (table) => {
            table.increments('id').primary();
            table.integer('quix_id').unsigned().references('quix.id');
            table.integer('participant_id').unsigned().references('participant.id');
            table.integer('score').unsigned().default(0);
        })

        .createTableIfNotExists('quix_category', (table) => {
            table.increments('id').primary();
            table.integer('quix_id').unsigned().references('quix.id');
            table.boolean('has_bonus');
            table.integer('question_time').unsigned();
            table.integer('bonus_time').unsigned();
            table.float('question_grade').unsigned();
            table.float('bonus_grade').unsigned();
        })

        .createTableIfNotExists('quix_repo', (table) => {
            table.increments('id').primary();
            table.integer('quix_category_id').unsigned().references('quix_category.id');
            table.text('question').notNullable();
            table.boolean('hasOptions');
            table.string('optionA');
            table.string('optionB');
            table.string('optionC');
            table.string('optionD');
            table.string('optionE');
            table.string('answer').notNullable();
            table.float('time_allowed');
        });

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user')
        .dropTableIfExists('organizer')
        .dropTableIfExists('participant')
        .dropTableIfExists('role')
        .dropTableIfExists('role_permission')
        .dropTableIfExists('permission')
        .dropTableIfExists('quix')
        .dropTableIfExists('quix_participants')
        .dropTableIfExists('quix_category')
        .dropTableIfExists('quix_repo');
}

;
