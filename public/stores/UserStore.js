import alt from '../helpers/alt';
import actions from '../actions/UserActions';
import BaseStore from './BaseStore';
import { USER as key } from '../constants/KeyConstants';

const initialValue = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
};

class UserStore extends BaseStore {
    constructor() {
        super({ actions, key, initialValue });
    }
}

export default alt.createStore(UserStore, 'UserStore');
