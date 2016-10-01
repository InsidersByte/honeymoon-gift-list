const bookshelf = require('../bookshelf');

const WeddingProfile = bookshelf.Model.extend({
    tableName: 'wedding_profiles',
    hasTimestamps: true,
});

module.exports = WeddingProfile;
