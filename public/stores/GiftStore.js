import alt from '../helpers/alt';
import actions from '../actions/GiftActions';
import BaseStore from './BaseStore';
import { GIFT as key } from '../constants/KeyConstants';
import { confirmationPageRoute } from '../constants/routeConstants';
import history from '../helpers/history';

class GiftStore extends BaseStore {
    constructor() {
        super({ actions, key });
    }

    createSuccess(giftSet) {
        super.createSuccess(giftSet);
        history.push(confirmationPageRoute(giftSet.id));
    }
}

export default alt.createStore(GiftStore, 'GiftStore');
