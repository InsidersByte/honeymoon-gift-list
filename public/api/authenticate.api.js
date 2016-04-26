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
        // TODO: this is a little bit of a hack so we should work out a better way to do this
        return this.put(data, null, `resetPassword/${data.token}`);
    }
}

export default new AuthenticateApi;
