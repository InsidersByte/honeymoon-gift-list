import { push } from 'react-router-redux';
import { success } from './notifications';
import { CALL_API } from '../middleware/api';
import * as TYPES from '../constants/actionTypes';
import { HTTP_METHODS } from '../constants/api';
import { confirmationPageRoute } from '../constants/routes';
import { emptyBasket } from './basket';

export function loadGiftSet(id) {
    return {
        [CALL_API]: {
            endpoint: `giftSet/${id}`,
            method: HTTP_METHODS.GET,
            authenticated: true,
            types: [TYPES.LOAD_GIFT_SET_REQUEST, TYPES.LOAD_GIFT_SET_SUCCESS, TYPES.LOAD_GIFT_SET_ERROR],
        },
    };
}

export function createGiftSet(data) {
    return {
        [CALL_API]: {
            data,
            endpoint: 'giftSet',
            method: HTTP_METHODS.POST,
            authenticated: true,
            afterSuccess: (dispatch, { id }) => {
                dispatch(success({ message: 'Gift set created successfully' }));
                dispatch(push(confirmationPageRoute(id)));
                dispatch(emptyBasket());
            },
            types: [TYPES.CREATE_GIFT_SET_REQUEST, TYPES.CREATE_GIFT_SET_SUCCESS, TYPES.CREATE_GIFT_SET_ERROR],
        },
    };
}
