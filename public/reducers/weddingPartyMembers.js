import * as TYPES from '../constants/actionTypes';
import { move } from '../utils/sortingHelper';

const initialWeddingPartyMembers = {
    loading: false,
    saving: false,
    deleting: false,
    weddingPartyMembers: [],
};

function moveMembers({ weddingPartyMembers }, { payload: { sourceId, targetId } }) {
    return move({ sourceId, targetId, data: weddingPartyMembers });
}

export default function weddingPartyMembersReducer(state = initialWeddingPartyMembers, action) {
    switch (action.type) {
        case TYPES.LOAD_WEDDING_PARTY_MEMBERS_REQUEST:
            return Object.assign({}, state, { loading: true });

        case TYPES.LOAD_WEDDING_PARTY_MEMBERS_SUCCESS:
            return Object.assign({}, state, { weddingPartyMembers: action.payload, loading: false });

        case TYPES.LOAD_WEDDING_PARTY_MEMBERS_ERROR:
            return Object.assign({}, state, { loading: false });

        case TYPES.DELETE_WEDDING_PARTY_MEMBER_REQUEST:
            return Object.assign({}, state, { deleting: true });

        case TYPES.DELETE_WEDDING_PARTY_MEMBER_SUCCESS:
            return Object.assign({}, state, { deleting: false });

        case TYPES.DELETE_WEDDING_PARTY_MEMBER_ERROR:
            return Object.assign({}, state, { deleting: false });

        case TYPES.MOVE_WEDDING_PARTY_MEMBER:
            return Object.assign({}, state, { weddingPartyMembers: moveMembers(state, action) });

        default:
            return state;
    }
}
