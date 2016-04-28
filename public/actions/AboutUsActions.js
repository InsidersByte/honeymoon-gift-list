import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/AboutUsApi';
import { ABOUT_US as key } from '../constants/KeyConstants';

class AboutUsActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(AboutUsActions);
