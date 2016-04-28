import BaseApi from '../helpers/api';

const apiUrl = 'weddingPlaylist';

class SetupApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }
}

export default new SetupApi;
