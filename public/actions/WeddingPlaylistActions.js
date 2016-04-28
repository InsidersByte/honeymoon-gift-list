import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/WeddingPlaylistApi';
import { WEDDING_PLAYLIST as key } from '../constants/KeyConstants';

class WeddingPlaylistActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(WeddingPlaylistActions);
