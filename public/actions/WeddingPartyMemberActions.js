import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/WeddingPartyMembersApi';
import { WEDDING_PARTY_MEMBER as key } from '../constants/keys.constants';

class WeddingPartyMemberActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(WeddingPartyMemberActions);
