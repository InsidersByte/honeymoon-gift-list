import alt from '../helpers/alt';
import actions from '../actions/WeddingPartyMemberActions';
import BaseStore from './BaseStore';
import { WEDDING_PARTY_MEMBER as key } from '../constants/keys.constants';
import { WEDDING_PARTY_MEMBERS_ROUTE } from '../constants/routes.constants';
import history from '../helpers/history';

class WeddingPartyMemberStore extends BaseStore {
    constructor() {
        super({ actions, key });
    }

    createSuccess(data) {
        super.updateSuccess(data);
        history.push(WEDDING_PARTY_MEMBERS_ROUTE);
    }
}

export default alt.createStore(WeddingPartyMemberStore, 'WeddingPartyMemberStore');
