import { push } from 'react-router-redux';
import { CALL_API } from '../middleware/api';
import { success } from './notifications';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../constants/actionTypes';
import { TOKEN } from '../constants/storageKeys';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../constants/routes';
import { HTTP_METHODS } from '../constants/api';

export function login({ email, password }) {
    return {
        [CALL_API]: {
            data: { email, password },
            endpoint: 'authenticate',
            method: HTTP_METHODS.POST,
            afterSuccess: (dispatch, { token }) => {
                localStorage.setItem(TOKEN, token);
                dispatch(success({ message: 'Successfully logged in' }));
                dispatch(push(ADMIN_ROUTE));
            },
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR],
        },
    };
}

export function logout() {
    return (dispatch) => {
        localStorage.removeItem(TOKEN);
        dispatch({ type: LOGOUT });
        dispatch(success({ message: 'Successfully logged out' }));
        dispatch(push(LOGIN_ROUTE));
    };
}
