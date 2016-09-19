import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/SignUpApi';
import { SIGN_UP as key } from '../constants/KeyConstants';

class SignUpActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(SignUpActions);
