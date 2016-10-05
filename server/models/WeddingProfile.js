const bookshelf = require('../bookshelf');

module.exports = bookshelf.model('WeddingProfile', {
    tableName: 'wedding_profiles',
    hasTimestamps: true,
});
