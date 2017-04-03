const bookshelf = require('../bookshelf');

module.exports = bookshelf.model('Section', {
  tableName: 'sections',
  hasTimestamps: true,
});
