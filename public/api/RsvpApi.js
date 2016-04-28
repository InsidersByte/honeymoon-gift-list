import BaseApi from '../helpers/api';

const apiUrl = 'rsvp';

class RsvpApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }
}

export default new RsvpApi;
