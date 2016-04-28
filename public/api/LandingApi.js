import BaseApi from '../helpers/api';

const apiUrl = 'landing';

class LandingApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }
}

export default new LandingApi;
