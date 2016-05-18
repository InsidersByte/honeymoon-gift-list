import alt from '../helpers/alt';
import actions from '../actions/HoneymoonGiftListActions';
import BaseStore from './BaseStore';
import { HONEYMOON_GIFT_LIST as key } from '../constants/KeyConstants';

const initialValue = {
    content: '',
    showPaymentMessage: false,
    showDisclaimerMessage: false,
    paymentMessage: '',
    disclaimerMessage: '',
};

class HoneymoonGiftListStore extends BaseStore {
    constructor() {
        super({ actions, key, initialValue });
    }
}

export default alt.createStore(HoneymoonGiftListStore, 'HoneymoonGiftListStore');
