import { success } from '../redux/notifications';
import { CALL_API } from '../middleware/api';
import * as TYPES from '../constants/actionTypes';
import { HTTP_METHODS } from '../constants/api';
import { emptyBasket } from '../redux/basket';

export function loadGiftSets() {
  return {
    [CALL_API]: {
      endpoint: 'giftSet',
      method: HTTP_METHODS.GET,
      authenticated: true,
      types: [TYPES.LOAD_GIFT_SETS_REQUEST, TYPES.LOAD_GIFT_SETS_SUCCESS, TYPES.LOAD_GIFT_SETS_ERROR],
    },
  };
}

export function loadGiftSet(id) {
  return {
    [CALL_API]: {
      endpoint: `giftSet/${id}`,
      method: HTTP_METHODS.GET,
      types: [TYPES.LOAD_GIFT_SET_REQUEST, TYPES.LOAD_GIFT_SET_SUCCESS, TYPES.LOAD_GIFT_SET_ERROR],
    },
  };
}

export function createGiftSet(data, onSuccess) {
  return {
    [CALL_API]: {
      data,
      endpoint: 'giftSet',
      method: HTTP_METHODS.POST,
      afterSuccess: (dispatch, giftSet) => {
        if (onSuccess) {
          onSuccess(giftSet);
        }

        dispatch(success({ message: 'Gift set created successfully' }));
        dispatch(emptyBasket());
      },
      types: [TYPES.CREATE_GIFT_SET_REQUEST, TYPES.CREATE_GIFT_SET_SUCCESS, TYPES.CREATE_GIFT_SET_ERROR],
    },
  };
}

export function deleteGiftSet({ id }) {
  return {
    [CALL_API]: {
      endpoint: `giftSet/${id}`,
      method: HTTP_METHODS.DELETE,
      authenticated: true,
      afterSuccess: dispatch => {
        dispatch(success({ message: 'Gift set deleted successfully' }));
      },
      types: [TYPES.DELETE_GIFT_SET_REQUEST, TYPES.DELETE_GIFT_SET_SUCCESS, TYPES.DELETE_GIFT_SET_ERROR],
    },
  };
}

export function markGiftSetAsDetailsSent({ id }) {
  return {
    [CALL_API]: {
      endpoint: `giftSet/${id}/detailsSent`,
      method: HTTP_METHODS.PUT,
      authenticated: true,
      afterSuccess: dispatch => {
        dispatch(success({ message: 'Gift set marked as details sent successfully' }));
      },
      types: [TYPES.GIFT_SET_DETAILS_SENT_REQUEST, TYPES.GIFT_SET_DETAILS_SENT_SUCCESS, TYPES.GIFT_SET_DETAILS_SENT_ERROR],
    },
  };
}

export function markGiftSetAsPaid({ id }) {
  return {
    [CALL_API]: {
      endpoint: `giftSet/${id}/paid`,
      method: HTTP_METHODS.PUT,
      authenticated: true,
      afterSuccess: dispatch => {
        dispatch(success({ message: 'Gift set marked as paid successfully' }));
      },
      types: [TYPES.GIFT_SET_PAID_REQUEST, TYPES.GIFT_SET_PAID_SUCCESS, TYPES.GIFT_SET_PAID_ERROR],
    },
  };
}
