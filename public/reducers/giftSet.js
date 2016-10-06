import * as TYPES from '../constants/actionTypes';

const giftSet = {
    loading: false,
    saving: false,
    giftSet: {
        giver: {},
        gifts: [],
    },
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

        case TYPES.GIFT_SET_DETAILS_SENT_REQUEST:
            return Object.assign({}, state, { saving: true });

        case TYPES.GIFT_SET_DETAILS_SENT_SUCCESS:
            return Object.assign({}, state, { giftSet: action.payload, saving: false });

        case TYPES.GIFT_SET_DETAILS_SENT_ERROR:
            return Object.assign({}, state, { saving: false });

        case TYPES.GIFT_SET_PAID_REQUEST:
            return Object.assign({}, state, { saving: true });

        case TYPES.GIFT_SET_PAID_SUCCESS:
            return Object.assign({}, state, { giftSet: action.payload, saving: false });

        case TYPES.GIFT_SET_PAID_ERROR:
            return Object.assign({}, state, { saving: false });

        case TYPES.DELETE_GIFT_SET_REQUEST:
            return Object.assign({}, state, { deleting: true });

        case TYPES.DELETE_GIFT_SET_SUCCESS:
            return Object.assign({}, state, { deleting: false });

        case TYPES.DELETE_GIFT_SET_ERROR:
            return Object.assign({}, state, { deleting: false });

        default:
            return state;
    }
}
