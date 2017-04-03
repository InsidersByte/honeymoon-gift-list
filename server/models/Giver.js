const bookshelf = require('../bookshelf');
require('./GiftSet');

module.exports = bookshelf.model('Giver', {
  tableName: 'givers',
  hasTimestamps: true,
  giftSets() {
    return this.hasMany('GiftSet');
  },
  virtuals: {
    fullName() {
      return `${this.get('forename')}  ${this.get('surname')}`;
    },
  },
});
