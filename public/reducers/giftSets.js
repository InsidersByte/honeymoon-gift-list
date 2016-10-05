import * as TYPES from '../constants/actionTypes';

const giftSets = {
    loading: false,
    giftSets: [],
};

export default function giftSetReducer(state = giftSets, action) {
    switch (action.type) {
        case TYPES.LOAD_GIFT_SETS_REQUEST:
            return Object.assign({}, state, { loading: true });

        case TYPES.LOAD_GIFT_SETS_SUCCESS:
            return Object.assign({}, state, { giftSets: action.payload, loading: false });

        case TYPES.LOAD_GIFT_SETS_ERROR:
            return Object.assign({}, state, { loading: false });

        default:
            return state;
    }
}
