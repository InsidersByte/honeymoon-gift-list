/* @flow */

import decode from 'jwt-decode';

function getTokenExpirationDate(decodedToken: Object): ?Date {
    if (!decodedToken.exp) {
        return null;
    }

    // The 0 here is the key, which sets the date to the epoch
    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);

    return date;
}

export default function decodeToken(token: ?string): ?Object {
    if (token == null) {
        return null;
    }

    const decodedToken = decode(token);
    const expiryDate = getTokenExpirationDate(decodedToken);

    if (expiryDate == null) {
        return null;
    }

    if (new Date() > expiryDate) {
        return null;
    }

    return decodedToken;
}
