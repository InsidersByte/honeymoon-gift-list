import alt from '../helpers/alt';
import actions from '../actions/LandingActions';
import BaseStore from './BaseStore';
import { LANDING as key } from '../constants/KeyConstants';

const initialValue = {
    giftSetCount: 0,
};

class LandingStore extends BaseStore {
    constructor() {
        super({ actions, key, initialValue });
    }
}

export default alt.createStore(LandingStore, 'LandingStore');
