exports.up = knex =>
  knex.schema.createTable('wedding_party_members', table => {
    table.increments();
    table.timestamps();
    table.string('name').notNullable();
    table.string('title').notNullable();
    table.string('image_url').notNullable();
    table.string('description').notNullable();
    table.integer('position').notNullable();
    table.integer('wedding_profile_id').references('wedding_profiles.id').notNullable();
  });

exports.down = knex => knex.schema.dropTable('wedding_party_members');
