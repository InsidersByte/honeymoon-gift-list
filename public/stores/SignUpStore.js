import alt from '../helpers/alt';
import actions from '../actions/SignUpActions';
import BaseStore from './BaseStore';
import { SIGN_UP as key } from '../constants/KeyConstants';

const initialValue = {
    name: '',
    password: '',
    confirmPassword: '',
};

class SignUpStore extends BaseStore {
    constructor() {
        super({ actions, key, initialValue });
    }
}

export default alt.createStore(SignUpStore, 'SignUpStore');
