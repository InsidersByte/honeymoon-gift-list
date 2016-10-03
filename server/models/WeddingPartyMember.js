const bookshelf = require('../bookshelf');

const WeddingPartyMember = bookshelf.Model.extend({
    tableName: 'wedding_party_members',
    hasTimestamps: true,
});

module.exports = WeddingPartyMember;
