exports.up = knex =>
  knex.schema.createTable('wedding_profiles', table => {
    table.increments();
    table.timestamps();
    table.string('cover_title').notNullable();
    table.string('cover_image_url').notNullable();
    table.timestamp('wedding_date').notNullable();
    table.text('gift_list_content', 'medium').notNullable();
    table.boolean('show_payment_message').notNullable().defaultTo(false);
    table.string('payment_message');
    table.boolean('show_disclaimer_message').notNullable().defaultTo(false);
    table.string('disclaimer_message');
  });

exports.down = knex => knex.schema.dropTable('wedding_profiles');
