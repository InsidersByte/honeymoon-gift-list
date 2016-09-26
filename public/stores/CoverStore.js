import alt from '../helpers/alt';
import actions from '../actions/CoverActions';
import BaseStore from './BaseStore';
import { COVER as key } from '../constants/KeyConstants';

const initialValue = {
    title: '',
    imageUrl: '',
    weddingDate: null,
};

class CoverStore extends BaseStore {
    constructor() {
        super({ actions, key, initialValue });
    }
}

export default alt.createStore(CoverStore, 'CoverStore');
