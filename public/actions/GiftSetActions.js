import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/GiftSetApi';
import { GIFT_SET as key } from '../constants/KeyConstants';

class GiftSetActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(GiftSetActions);
