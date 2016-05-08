import alt from '../helpers/alt';
import actions from '../actions/WeddingPartyMemberActions';
import BaseStore from './BaseStore';
import { WEDDING_PARTY_MEMBER as key } from '../constants/KeyConstants';
import { WEDDING_PARTY_MEMBERS_ROUTE } from '../constants/routeConstants';
import history from '../helpers/history';
import random from '../../lib/random';
import { MAXIMUM_NUMBER } from '../constants/sorting';

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
        const movingUp = sourceMemberIndex > targetMemberIndex;
        let nextTargetPosition;

        const member = { ...members[sourceMemberIndex] };
        const { position: targetMemberPosition } = members[targetMemberIndex];

        if (targetMemberIndex === 0) {
            nextTargetPosition = 0;
        } else if (targetMemberIndex === members.length - 1) {
            nextTargetPosition = targetMemberPosition + MAXIMUM_NUMBER;
        } else {
            const nextTargetMemberIndex = movingUp ? targetMemberIndex - 1 : targetMemberIndex + 1;
            nextTargetPosition = members[nextTargetMemberIndex].position;
        }

        let newPosition;

        if (movingUp) {
            newPosition = random.integer(nextTargetPosition + 1, targetMemberPosition - 1);
        } else {
            newPosition = random.integer(targetMemberPosition + 1, nextTargetPosition - 1);
        }

        member.position = newPosition;

        members.splice(sourceMemberIndex, 1);
        members.splice(targetMemberIndex, 0, member);

        this.members = members;
    }
}

export default alt.createStore(WeddingPartyMemberStore, 'WeddingPartyMemberStore');
