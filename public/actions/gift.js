import { createAction } from 'redux-actions';
import { success } from '../redux/notifications';
import { CALL_API } from '../middleware/api';
import * as TYPES from '../constants/actionTypes';
import { HTTP_METHODS } from '../constants/api';

export const openGiftModal = createAction(TYPES.OPEN_GIFT_MODAL);
export const closeGiftModal = createAction(TYPES.CLOSE_GIFT_MODAL);
export const moveGift = createAction(TYPES.MOVE_GIFT);

export function loadGifts() {
    return {
        [CALL_API]: {
            endpoint: 'gift',
            method: HTTP_METHODS.GET,
            types: [TYPES.LOAD_GIFTS_REQUEST, TYPES.LOAD_GIFTS_SUCCESS, TYPES.LOAD_GIFTS_ERROR],
        },
    };
}

export function createGift(data) {
    return {
        [CALL_API]: {
            data,
            endpoint: 'gift',
            method: HTTP_METHODS.POST,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'Gift created successfully' }));
                dispatch(closeGiftModal());
            },
            types: [TYPES.CREATE_GIFT_REQUEST, TYPES.CREATE_GIFT_SUCCESS, TYPES.CREATE_GIFT_ERROR],
        },
    };
}

export function updateGift(data) {
    return {
        [CALL_API]: {
            data,
            endpoint: `gift/${data.id}`,
            method: HTTP_METHODS.PUT,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'Gift updated successfully' }));
                dispatch(closeGiftModal());
            },
            types: [TYPES.UPDATE_GIFT_REQUEST, TYPES.UPDATE_GIFT_SUCCESS, TYPES.UPDATE_GIFT_ERROR],
        },
    };
}

export function deleteGift({ id }) {
    return {
        [CALL_API]: {
            endpoint: `gift/${id}`,
            method: HTTP_METHODS.DELETE,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'Gift deleted successfully' }));
            },
            types: [TYPES.DELETE_GIFT_REQUEST, TYPES.DELETE_GIFT_SUCCESS, TYPES.DELETE_GIFT_ERROR],
        },
    };
}

