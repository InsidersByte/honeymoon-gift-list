const Knex = require('knex');
const bookshelf = require('bookshelf');
const knexFile = require('../../knexfile');

const knex = new Knex(knexFile[process.env.NODE_ENV]);

const orm = bookshelf(knex);

orm.plugin('bookshelf-camelcase');
orm.plugin('visibility');

module.exports = orm;
