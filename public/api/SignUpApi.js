import BaseApi from '../helpers/api';

const apiUrl = 'signUp';

class SetupApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }
}

export default new SetupApi();
