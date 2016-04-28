import BaseApi from '../helpers/api';

const apiUrl = 'cover';

class CoverApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }
}

export default new CoverApi;
