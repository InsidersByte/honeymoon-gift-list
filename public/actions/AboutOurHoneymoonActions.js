import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/AboutOurHoneymoonApi';
import { ABOUT_OUR_HONEYMOON as key } from '../constants/KeyConstants';

class AboutOurHoneymoonActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(AboutOurHoneymoonActions);
