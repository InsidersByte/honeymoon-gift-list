import alt from '../helpers/alt';
import actions from '../actions/HoneymoonGiftListItemActions';
import BaseStore from './BaseStore';
import { HONEYMOON_GIFT_LIST_ITEM as key } from '../constants/KeyConstants';

const initialValue = {
    imageUrl: '',
    name: '',
    description: '',
    requested: '',
    price: '',
};

class HoneymoonGiftListItemStore extends BaseStore {
    constructor() {
        super({ actions, key, initialValue });
    }
}

export default alt.createStore(HoneymoonGiftListItemStore, 'HoneymoonGiftListItemStore');
