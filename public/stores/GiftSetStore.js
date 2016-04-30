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
        this.bindAction(actions.detailsSent, this.update);
        this.bindAction(actions.detailsSentSuccess, this.updateSuccess);
        this.bindAction(actions.detailsSentError, this.updateError);
        this.bindAction(actions.paid, this.update);
        this.bindAction(actions.paidSuccess, this.updateSuccess);
        this.bindAction(actions.paidError, this.updateError);
    }
}

export default alt.createStore(GiftSetStore, 'GiftSetStore');
