const bookshelf = require('../bookshelf');
require('./GiftSet');

module.exports = bookshelf.model('Gift', {
  tableName: 'gifts',
  hasTimestamps: true,
  giftSets() {
    return this.belongsToMany('GiftSet').withPivot(['quantity', 'price']);
  },
  virtuals: {
    remaining() {
      const requested = this.get('requested');
      const giftSets = this.related('giftSets');

      let remaining = requested;

      for (const giftSet of giftSets.models) {
        remaining -= giftSet.pivot.get('quantity');
      }

      return remaining;
    },
  },
});
