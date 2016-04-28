import BaseApi from '../helpers/api';

const apiUrl = 'giftSet';

class GiftSetApi extends BaseApi {
    constructor() {
        super(apiUrl);
    }

    paid(giftSet, giftSetId) {
        return this.put(giftSet, giftSetId, 'paid');
    }

    detailsSent(giftSet, giftSetId) {
        return this.put(giftSet, giftSetId, 'detailsSent');
    }
}

export default new GiftSetApi;
