import alt from '../helpers/alt';
import history from '../helpers/history';
import actions from '../actions/SignUpActions';
import BaseStore from './BaseStore';
import { SIGN_UP as key } from '../constants/KeyConstants';
import { LOGIN_ROUTE } from '../constants/routeConstants';

const initialValue = {
    username: '',
};

class SignUpStore extends BaseStore {
    constructor() {
        super({ actions, key, initialValue });
    }

    updateSuccess(user) {
        super.updateSuccess(user);
        history.push(LOGIN_ROUTE);
    }
}

export default alt.createStore(SignUpStore, 'SignUpStore');
