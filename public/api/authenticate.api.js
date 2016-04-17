import BaseApi from '../helpers/api';

const apiUrl = 'authenticate';

class AuthenticateApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }

    resetPassword(user) {
        return this.post(user, 'resetPassword');
    }
}

export default new AuthenticateApi;
