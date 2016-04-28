import BaseApi from '../helpers/api';

const apiUrl = 'aboutOurDay';

class AboutOurDayApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }
}

export default new AboutOurDayApi;
