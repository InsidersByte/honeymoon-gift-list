import alt from '../helpers/alt';
import actions from '../actions/GiftSetActions';
import BaseStore from './BaseStore';
import { GIFT_SET as key } from '../constants/KeyConstants';

const initialValue = {
    giver: {},
    gifts: [],
};

class GiftSetStore extends BaseStore {
    constructor() {
        super({ actions, key, initialValue });
    }
}

export default alt.createStore(GiftSetStore, 'GiftSetStore');
