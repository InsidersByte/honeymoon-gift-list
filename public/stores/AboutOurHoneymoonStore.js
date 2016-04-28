import alt from '../helpers/alt';
import actions from '../actions/AboutOurHoneymoonActions';
import BaseStore from './BaseStore';
import { ABOUT_OUR_HONEYMOON as key } from '../constants/KeyConstants';

class AboutOurHoneymoonStore extends BaseStore {
    constructor() {
        super({ actions, key });
    }
}

export default alt.createStore(AboutOurHoneymoonStore, 'AboutOurHoneymoonStore');
