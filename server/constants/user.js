const { format } = require('util');

const MINIMUM_PASSWORD_LENGTH = 8;

module.exports = {
    STATUS: {
        ACTIVE: 'active',
        INVITED: 'invited',
        INVITE_PENDING: 'invite_pending',
    },

    MINIMUM_PASSWORD_LENGTH,
    MINIMUM_PASSWORD_MESSAGE: format('At least %d characters in length', MINIMUM_PASSWORD_LENGTH),
};
