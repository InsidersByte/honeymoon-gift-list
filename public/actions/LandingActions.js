import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/LandingApi';
import { LANDING as key } from '../constants/KeyConstants';

class LandingActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(LandingActions);
