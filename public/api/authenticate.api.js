import BaseApi from '../helpers/api';

const apiUrl = 'authenticate';

class AuthenticateApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }

    resetPasswordPost(user) {
        return this.post(user, 'resetPassword');
    }

    resetPasswordPut(data) {
        return this.put(data, null, `resetPassword/${data.token}`);
    }
}

export default new AuthenticateApi;
