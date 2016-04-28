import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/LocalFlavourApi';
import { LOCAL_FLAVOUR as key } from '../constants/KeyConstants';

class LocalFlavourActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(LocalFlavourActions);
