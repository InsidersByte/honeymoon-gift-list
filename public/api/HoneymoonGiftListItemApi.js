import BaseApi from '../helpers/api';

const apiUrl = 'honeymoonGiftListItem';

class HoneymoonGiftListItem extends BaseApi {
    constructor() {
        super(apiUrl);
    }
}

export default new HoneymoonGiftListItem;
