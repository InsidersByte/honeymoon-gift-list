import { success } from './notifications';
import { CALL_API } from '../middleware/api';
import * as TYPES from '../constants/actionTypes';
import { HTTP_METHODS } from '../constants/api';

export function loadWeddingProfile() {
    return {
        [CALL_API]: {
            endpoint: 'weddingProfile',
            method: HTTP_METHODS.GET,
            authenticated: true,
            types: [TYPES.LOAD_WEDDING_PROFILE_REQUEST, TYPES.LOAD_WEDDING_PROFILE_SUCCESS, TYPES.LOAD_WEDDING_PROFILE_ERROR],
        },
    };
}

export function updateWeddingProfile(data) {
    return {
        [CALL_API]: {
            data,
            endpoint: 'weddingProfile',
            method: HTTP_METHODS.PUT,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'Wedding Profile updated successfully' }));
            },
            types: [TYPES.UPDATE_WEDDING_PROFILE_REQUEST, TYPES.UPDATE_WEDDING_PROFILE_SUCCESS, TYPES.UPDATE_WEDDING_PROFILE_ERROR],
        },
    };
}
