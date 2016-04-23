import alt from '../helpers/alt';
import actions from '../actions/WeddingPartyMemberActions';
import BaseStore from './BaseStore';
import { WEDDING_PARTY_MEMBER as key } from '../constants/keys.constants';
import { WEDDING_PARTY_MEMBERS_ROUTE } from '../constants/routes.constants';
import history from '../helpers/history';

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
}

export default alt.createStore(WeddingPartyMemberStore, 'WeddingPartyMemberStore');
