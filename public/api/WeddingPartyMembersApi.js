import BaseApi from '../helpers/api';

const apiUrl = 'weddingPartyMembers';

class UserApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }
}

export default new UserApi;
