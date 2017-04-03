exports.up = knex =>
  knex.schema.createTable('givers', table => {
    table.increments();
    table.timestamps();
    table.string('forename').notNullable();
    table.string('surname').notNullable();
    table.string('email').unique().notNullable();
    table.string('phone_number').notNullable();
  });

exports.down = knex => knex.schema.dropTable('givers');
