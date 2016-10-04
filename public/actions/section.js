import { CALL_API } from '../middleware/api';
import * as TYPES from '../constants/actionTypes';
import { HTTP_METHODS } from '../constants/api';

export function loadSections() { // eslint-disable-line import/prefer-default-export
    return {
        [CALL_API]: {
            endpoint: 'section',
            method: HTTP_METHODS.GET,
            authenticated: true,
            types: [TYPES.LOAD_SECTIONS_REQUEST, TYPES.LOAD_SECTIONS_SUCCESS, TYPES.LOAD_SECTIONS_ERROR],
        },
    };
}
