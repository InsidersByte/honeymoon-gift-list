const bookshelf = require('../bookshelf');
require('./Giver');
require('./Gift');

module.exports = bookshelf.model('GiftSet', {
  tableName: 'gift_sets',
  hasTimestamps: true,
  giver() {
    return this.belongsTo('Giver');
  },
  gifts() {
    return this.belongsToMany('Gift').withPivot(['quantity', 'price']);
  },
  virtuals: {
    total() {
      const gifts = this.related('gifts');

      let total = 0;

      for (const gift of gifts.models) {
        total += gift.pivot.get('quantity') * gift.pivot.get('price');
      }

      return total;
    },
  },
});
