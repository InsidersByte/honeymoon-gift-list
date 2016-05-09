import alt from '../helpers/alt';
import actions from '../actions/WeddingProfileActions';
import BaseStore from './BaseStore';
import { WEDDING_PROFILE as key } from '../constants/KeyConstants';

const initialValue = {
    cover: {
        title: '',
        imageUrl: '',
        weddingDate: '',
        daysToGo: 0,
    },
    aboutUs: '',
    aboutOurDay: '',
    aboutOurHoneymoon: '',
    honeymoonGiftListItems: [],
    honeymoonGiftList: {},
    rsvp: '',
    weddingPlaylist: '',
    localFlavour: '',
    onTheDay: '',
    weddingPartyMembers: [],
};

class WeddingProfileStore extends BaseStore {
    constructor() {
        super({ actions, key, initialValue });
    }
}

export default alt.createStore(WeddingProfileStore, 'WeddingProfileStore');
