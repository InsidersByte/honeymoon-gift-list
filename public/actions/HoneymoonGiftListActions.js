import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/HoneymoonGiftListApi';
import { HONEYMOON_GIFT_LIST as key } from '../constants/KeyConstants';

class HoneymoonGiftListActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(HoneymoonGiftListActions);
