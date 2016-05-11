import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/HoneymoonGiftListItemApi';
import { HONEYMOON_GIFT_LIST_ITEM as key } from '../constants/KeyConstants';

class HoneymoonGiftListItemActions extends BaseActions {
    constructor() {
        super({ api, key });
        this.generateActions('move');
    }
}

export default alt.createActions(HoneymoonGiftListItemActions);
