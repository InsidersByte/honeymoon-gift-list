exports.up = knex =>
    knex.schema.createTable('users', (table) => {
        table.increments();
        table.timestamps();
        table.string('name');
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('salt').notNullable();
        table.string('reset_password_token');
        table.string('reset_password_expires');
        table.enu('status', ['active', 'invite_pending', 'invited']).notNullable();
    });

exports.down = knex => knex.schema.dropTable('users');
