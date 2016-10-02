import { push } from 'react-router-redux';
import { success } from './notifications';
import { CALL_API } from '../middleware/api';
import * as TYPES from '../constants/actionTypes';
import { HTTP_METHODS } from '../constants/api';
import { ADMIN_ROUTE } from '../constants/routes';

export function setup(data) { // eslint-disable-line import/prefer-default-export
    return {
        [CALL_API]: {
            data,
            endpoint: 'setup',
            method: HTTP_METHODS.POST,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'You are all setup up' }));
                dispatch(push(ADMIN_ROUTE));
            },
            types: [TYPES.SETUP_REQUEST, TYPES.SETUP_SUCCESS, TYPES.SETUP_ERROR],
        },
    };
}
