import BaseApi from '../helpers/api';

const apiUrl = 'onTheDay';

class OnTheDayApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }
}

export default new OnTheDayApi;
