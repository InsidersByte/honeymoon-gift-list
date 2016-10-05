import * as TYPES from '../constants/actionTypes';

const giftSet = {
    loading: false,
    saving: false,
    giftSet: {},
};

export default function giftSetReducer(state = giftSet, action) {
    switch (action.type) {
        case TYPES.LOAD_GIFT_SET_REQUEST:
            return Object.assign({}, state, { loading: true });

        case TYPES.LOAD_GIFT_SET_SUCCESS:
            return Object.assign({}, state, { giftSet: action.payload, loading: false });

        case TYPES.LOAD_GIFT_SET_ERROR:
            return Object.assign({}, state, { loading: false });

        case TYPES.CREATE_GIFT_SET_REQUEST:
            return Object.assign({}, state, { saving: true });

        case TYPES.CREATE_GIFT_SET_SUCCESS:
            return Object.assign({}, state, { saving: false });

        case TYPES.CREATE_GIFT_SET_ERROR:
            return Object.assign({}, state, { saving: false });

        default:
            return state;
    }
}
