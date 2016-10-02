import alt from '../helpers/alt';
import actions from '../actions/WeddingPartyMemberActions';
import BaseStore from './BaseStore';
import { WEDDING_PARTY_MEMBER as key } from '../constants/KeyConstants';
import { WEDDING_PARTY_MEMBERS_ROUTE } from '../constants/routes';
import history from '../helpers/history';
import { move } from '../utils/sortingHelper';

const initialValue = {
    name: '',
    title: '',
    imageUrl: '',
    description: '',
};

class WeddingPartyMemberStore extends BaseStore {
    constructor() {
        super({ actions, key, initialValue });
    }

    createSuccess(data) {
        super.createSuccess(data);
        history.push(WEDDING_PARTY_MEMBERS_ROUTE);
    }

    move({ sourceId, targetId }) {
        this.members = move({ sourceId, targetId, data: this.members });
    }
}

export default alt.createStore(WeddingPartyMemberStore, 'WeddingPartyMemberStore');
