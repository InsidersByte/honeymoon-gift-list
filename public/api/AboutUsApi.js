import BaseApi from '../helpers/api';

const apiUrl = 'aboutUs';

class AboutUsApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }
}

export default new AboutUsApi;
