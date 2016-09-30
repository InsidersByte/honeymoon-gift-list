exports.up = knex => knex.schema
    .createTable('gift_sets', (table) => {
        table.increments();
        table.timestamps();
        table.boolean('paid').notNullable().defaultTo(false);
        table.boolean('email_sent').notNullable().defaultTo(false);
        table.boolean('payment_details_sent').notNullable().defaultTo(false);
        table.enum('payment_method', ['PayPal', 'Bank Transfer']).notNullable();
        table.integer('giver_id').references('givers.id').notNullable();
    })
    .createTable('gift_sets_gifts', (table) => {
        table.integer('gift_set_id').references('gift_sets.id');
        table.integer('gift_id').references('gifts.id');
    });


exports.down = knex => knex.schema
    .dropTable('gift_sets_gifts')
    .dropTable('gift_sets');
