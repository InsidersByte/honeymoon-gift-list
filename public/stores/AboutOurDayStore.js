import alt from '../helpers/alt';
import actions from '../actions/AboutOurDayActions';
import BaseStore from './BaseStore';
import { ABOUT_OUR_DAY as key } from '../constants/KeyConstants';

class AboutOurDayStore extends BaseStore {
    constructor() {
        super({ actions, key });
    }
}

export default alt.createStore(AboutOurDayStore, 'AboutOurDayStore');
