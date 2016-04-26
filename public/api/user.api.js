import BaseApi from '../helpers/api';

const apiUrl = 'user';

class UserApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }

    passwordPut(user) {
        return this.put(user, null, 'password');
    }
}

export default new UserApi;
