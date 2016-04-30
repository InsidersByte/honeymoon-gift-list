import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/SetupApi';
import { SETUP as key } from '../constants/KeyConstants';

class SetupActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(SetupActions);
