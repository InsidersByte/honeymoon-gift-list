import * as TYPES from '../constants/actionTypes';

const weddingPartyMember = {
    loading: false,
    saving: false,
    weddingPartyMember: {},
};

export default function weddingPartyMemberReducer(state = weddingPartyMember, action) {
    switch (action.type) {
        case TYPES.CREATE_WEDDING_PARTY_MEMBERS_REQUEST:
            return Object.assign({}, state, { saving: true });

        case TYPES.CREATE_WEDDING_PARTY_MEMBERS_SUCCESS:
            return Object.assign({}, state, { weddingPartyMember: action.payload, saving: false });

        case TYPES.CREATE_WEDDING_PARTY_MEMBERS_ERROR:
            return Object.assign({}, state, { saving: false });

        default:
            return state;
    }
}
