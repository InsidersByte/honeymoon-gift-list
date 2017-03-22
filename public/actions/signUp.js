import { browserHistory } from 'react-router';
import { success } from '../redux/notifications';
import { CALL_API } from '../middleware/api';
import * as TYPES from '../constants/actionTypes';
import { HTTP_METHODS } from '../constants/api';
import { ADMIN_ROUTE } from '../constants/routes';

export function loadSignUp({ token }) {
    return {
        [CALL_API]: {
            endpoint: `signUp/${token}`,
            method: HTTP_METHODS.GET,
            types: [TYPES.LOAD_SIGN_UP_REQUEST, TYPES.LOAD_SIGN_UP_SUCCESS, TYPES.LOAD_SIGN_UP_ERROR],
        },
    };
}

export function signUp(data) {
    return {
        [CALL_API]: {
            data,
            endpoint: `signUp/${data.token}`,
            method: HTTP_METHODS.PUT,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'You are all signed up' }));
                browserHistory.push(ADMIN_ROUTE);
            },
            types: [TYPES.SIGN_UP_REQUEST, TYPES.SIGN_UP_SUCCESS, TYPES.SIGN_UP_ERROR],
        },
    };
}
