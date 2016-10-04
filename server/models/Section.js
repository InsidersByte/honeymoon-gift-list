const bookshelf = require('../bookshelf');

const Section = bookshelf.Model.extend({
    tableName: 'sections',
    hasTimestamps: true,
});

module.exports = Section;
