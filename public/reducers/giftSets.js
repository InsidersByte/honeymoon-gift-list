import * as TYPES from '../constants/actionTypes';

const giftSets = {
  loading: false,
  saving: false,
  deleting: false,
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

    case TYPES.DELETE_GIFT_SET_REQUEST:
      return Object.assign({}, state, { deleting: true });

    case TYPES.DELETE_GIFT_SET_SUCCESS:
      return Object.assign({}, state, { deleting: false });

    case TYPES.DELETE_GIFT_SET_ERROR:
      return Object.assign({}, state, { deleting: false });

    case TYPES.GIFT_SET_DETAILS_SENT_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.GIFT_SET_DETAILS_SENT_SUCCESS:
      return Object.assign({}, state, { saving: false });

    case TYPES.GIFT_SET_DETAILS_SENT_ERROR:
      return Object.assign({}, state, { saving: false });

    case TYPES.GIFT_SET_PAID_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.GIFT_SET_PAID_SUCCESS:
      return Object.assign({}, state, { saving: false });

    case TYPES.GIFT_SET_PAID_ERROR:
      return Object.assign({}, state, { saving: false });

    default:
      return state;
  }
}
