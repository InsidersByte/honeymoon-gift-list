import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/WeddingProfileApi';
import { ABOUT_OUR_DAY as key } from '../constants/KeyConstants';

class WeddingProfileActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(WeddingProfileActions);
