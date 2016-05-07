import update from 'react-addons-update';
import alt from '../helpers/alt';
import actions from '../actions/WeddingPartyMemberActions';
import BaseStore from './BaseStore';
import { WEDDING_PARTY_MEMBER as key } from '../constants/KeyConstants';
import { WEDDING_PARTY_MEMBERS_ROUTE } from '../constants/routeConstants';
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

    move({ sourceId, targetId }) {
        const members = [...this.members];
        const sourceMemberIndex = members.findIndex(o => o._id === sourceId); // eslint-disable-line no-underscore-dangle
        const targetMemberIndex = members.findIndex(o => o._id === targetId); // eslint-disable-line no-underscore-dangle

        // move at once to avoid complications
        const updatedMembers = update(members, {
            $splice: [
                [sourceMemberIndex, 1],
                [targetMemberIndex, 0, members[sourceMemberIndex]],
            ],
        });

        this.members = updatedMembers;
    }
}

export default alt.createStore(WeddingPartyMemberStore, 'WeddingPartyMemberStore');
