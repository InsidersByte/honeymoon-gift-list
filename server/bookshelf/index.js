const Knex = require('knex');
const bookshelf = require('bookshelf');
const config = require('../../knexfile');

const knex = new Knex(config[process.env.NODE_ENV]);

knex.migrate.latest([config]);

const orm = bookshelf(knex);

orm.plugin('bookshelf-camelcase');
orm.plugin('visibility');
orm.plugin('registry');
orm.plugin('virtuals');

module.exports = orm;
