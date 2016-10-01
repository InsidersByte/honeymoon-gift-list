import { push } from 'react-router-redux';
import { success } from './notifications';
import { CALL_API } from '../middleware/api';
import * as TYPES from '../constants/actionTypes';
import { HTTP_METHODS } from '../constants/api';
import { USERS_ROUTE } from '../constants/routes';

function onSaveUserSuccess(dispatch, notification) {
    dispatch(push(USERS_ROUTE));
    dispatch(success(notification));
}

function onCreateUserSuccess(dispatch) {
    onSaveUserSuccess(dispatch, { message: 'User created successfully' });
}

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
            onSuccess: onCreateUserSuccess,
            types: [TYPES.CREATE_USER_REQUEST, TYPES.CREATE_USER_SUCCESS, TYPES.CREATE_USER_ERROR],
        },
    };
}
