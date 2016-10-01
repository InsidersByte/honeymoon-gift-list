const bookshelf = require('../bookshelf');
const encryption = require('../utilities/encryption');

const User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,

    initialize() {
        this.on('saving', this.updatePassword);
    },

    updatePassword() {
        if (!this.hasChanged('password')) {
            return;
        }

        this.set({ salt: encryption.createSalt() });
        this.set({ password: encryption.hashPassword(this.get('salt'), this.get('password')) });
    },

    comparePassword(password) {
        return encryption.hashPassword(this.get('salt'), password) === this.get('password');
    },

    hidden: ['password', 'salt', 'resetPasswordToken', 'resetPasswordExpires'],
});

module.exports = User;
