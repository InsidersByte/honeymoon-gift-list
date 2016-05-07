import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/WeddingPartyMembersApi';
import { WEDDING_PARTY_MEMBER as key } from '../constants/KeyConstants';

class WeddingPartyMemberActions extends BaseActions {
    constructor() {
        super({ api, key });
        this.generateActions('move');
    }
}

export default alt.createActions(WeddingPartyMemberActions);
