import * as TYPES from '../constants/actionTypes';

const weddingPartyMembers = {
    loading: false,
    saving: false,
    deleting: false,
    weddingPartyMembers: [],
};

export default function weddingPartyMembersReducer(state = weddingPartyMembers, action) {
    switch (action.type) {
        case TYPES.LOAD_WEDDING_PARTY_MEMBERS_REQUEST:
            return Object.assign({}, state, { loading: true });

        case TYPES.LOAD_WEDDING_PARTY_MEMBERS_SUCCESS:
            return Object.assign({}, state, { weddingPartyMembers: action.payload, loading: false });

        case TYPES.LOAD_WEDDING_PARTY_MEMBERS_ERROR:
            return Object.assign({}, state, { loading: false });

        default:
            return state;
    }
}
