const bookshelf = require('../bookshelf');

module.exports = bookshelf.model('WeddingPartyMember', {
    tableName: 'wedding_party_members',
    hasTimestamps: true,
});
