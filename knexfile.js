module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://postgres@localhost:5432/our_wedding_heroes',
        migrations: {
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './seeds/development',
        },
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './seeds/production',
        },
    },
};
