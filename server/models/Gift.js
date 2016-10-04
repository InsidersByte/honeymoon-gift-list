const bookshelf = require('../bookshelf');

const Gift = bookshelf.Model.extend({
    tableName: 'gifts',
    hasTimestamps: true,
});

module.exports = Gift;
