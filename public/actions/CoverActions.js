import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/CoverApi';
import { COVER as key } from '../constants/KeyConstants';

class AboutOurDayActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(AboutOurDayActions);
