import alt from '../helpers/alt';
import actions from '../actions/WeddingPlaylistActions';
import BaseStore from './BaseStore';
import { WEDDING_PLAYLIST as key } from '../constants/KeyConstants';

class WeddingPlaylistStore extends BaseStore {
    constructor() {
        super({ actions, key });
    }
}

export default alt.createStore(WeddingPlaylistStore, 'WeddingPlaylistStore');
