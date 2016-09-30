exports.up = knex =>
    knex.schema.createTable('sections', (table) => {
        table.increments();
        table.timestamps();
        table.string('title').notNullable();
        table.string('content').notNullable();
        table.boolean('hidden').notNullable().defaultTo(false);
        table.integer('position').notNullable();
        table.integer('wedding_profile_id').references('wedding_profiles.id').notNullable();
    });

exports.down = knex => knex.schema.dropTable('sections');
