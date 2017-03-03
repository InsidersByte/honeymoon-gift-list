import { createAction } from 'redux-actions';
import { success } from '../redux/notifications';
import { CALL_API } from '../middleware/api';
import * as TYPES from '../constants/actionTypes';
import { HTTP_METHODS } from '../constants/api';

export const openUserModal = createAction(TYPES.OPEN_USER_MODAL);
export const closeUserModal = createAction(TYPES.CLOSE_USER_MODAL);

export function loadUsers() {
    return {
        [CALL_API]: {
            endpoint: 'user',
            method: HTTP_METHODS.GET,
            authenticated: true,
            types: [TYPES.LOAD_USERS_REQUEST, TYPES.LOAD_USERS_SUCCESS, TYPES.LOAD_USERS_ERROR],
        },
    };
}

export function createUser(user) {
    return {
        [CALL_API]: {
            data: user,
            endpoint: 'user',
            method: HTTP_METHODS.POST,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'User created successfully' }));
                dispatch(closeUserModal());
            },
            types: [TYPES.CREATE_USER_REQUEST, TYPES.CREATE_USER_SUCCESS, TYPES.CREATE_USER_ERROR],
        },
    };
}

export function deleteUser(user) {
    return {
        [CALL_API]: {
            data: user,
            endpoint: `user/${user.id}`,
            method: HTTP_METHODS.DELETE,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'User deleted successfully' }));
            },
            types: [TYPES.DELETE_USER_REQUEST, TYPES.DELETE_USER_SUCCESS, TYPES.DELETE_USER_ERROR],
        },
    };
}

export function changePassword(user) {
    return {
        [CALL_API]: {
            data: user,
            endpoint: 'user/password',
            method: HTTP_METHODS.PUT,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'Password Changed' }));
            },
            types: [TYPES.CHANGE_PASSWORD_REQUEST, TYPES.CHANGE_PASSWORD_SUCCESS, TYPES.CHANGE_PASSWORD_ERROR],
        },
    };
}
