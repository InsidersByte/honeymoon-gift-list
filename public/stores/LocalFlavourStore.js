import alt from '../helpers/alt';
import actions from '../actions/LocalFlavourActions';
import BaseStore from './BaseStore';
import { LOCAL_FLAVOUR as key } from '../constants/KeyConstants';

class LocalFlavourStore extends BaseStore {
    constructor() {
        super({ actions, key });
    }
}

export default alt.createStore(LocalFlavourStore, 'LocalFlavourStore');
