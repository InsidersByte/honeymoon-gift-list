import BaseApi from '../helpers/api';

const apiUrl = 'weddingPartyMember';

class WeddingPartyMembersApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }
}

export default new WeddingPartyMembersApi;
