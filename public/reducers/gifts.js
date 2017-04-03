import * as TYPES from '../constants/actionTypes';
import { move } from '../utils/sortingHelper';

const initialGifts = {
  loading: false,
  saving: false,
  deleting: false,
  giftModalOpen: false,
  gifts: [],
};

function moveGifts({ gifts }, { payload: { sourceId, targetId } }) {
  return move({ sourceId, targetId, data: gifts });
}

export default function giftsReducer(state = initialGifts, action) {
  switch (action.type) {
    case TYPES.OPEN_GIFT_MODAL:
      return Object.assign({}, state, { giftModalOpen: true });

    case TYPES.CLOSE_GIFT_MODAL:
      return Object.assign({}, state, { giftModalOpen: false });

    case TYPES.LOAD_GIFTS_REQUEST:
      return Object.assign({}, state, { loading: true });

    case TYPES.LOAD_GIFTS_SUCCESS:
      return Object.assign({}, state, { gifts: action.payload, loading: false });

    case TYPES.LOAD_GIFTS_ERROR:
      return Object.assign({}, state, { loading: false });

    case TYPES.CREATE_GIFT_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.CREATE_GIFT_SUCCESS:
      return Object.assign({}, state, { saving: false });

    case TYPES.CREATE_GIFT_ERROR:
      return Object.assign({}, state, { saving: false });

    case TYPES.UPDATE_GIFT_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.UPDATE_GIFT_SUCCESS:
      return Object.assign({}, state, { saving: false });

    case TYPES.UPDATE_GIFT_ERROR:
      return Object.assign({}, state, { saving: false });

    case TYPES.DELETE_GIFT_REQUEST:
      return Object.assign({}, state, { deleting: true });

    case TYPES.DELETE_GIFT_SUCCESS:
      return Object.assign({}, state, { deleting: true });

    case TYPES.DELETE_GIFT_ERROR:
      return Object.assign({}, state, { deleting: true });

    case TYPES.MOVE_GIFT:
      return Object.assign({}, state, { gifts: moveGifts(state, action) });

    default:
      return state;
  }
}
