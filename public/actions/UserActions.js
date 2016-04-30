import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/UserApi';
import { USER as key } from '../constants/KeyConstants';

class UserActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(UserActions);
