import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import { success } from '../redux/notifications';
import { CALL_API } from '../middleware/api';
import * as TYPES from '../constants/actionTypes';
import { HTTP_METHODS } from '../constants/api';
import { WEDDING_PARTY_MEMBERS_ROUTE } from '../constants/routes';

export const moveWeddingPartyMember = createAction(TYPES.MOVE_WEDDING_PARTY_MEMBER);

export function loadWeddingPartyMembers() {
    return {
        [CALL_API]: {
            endpoint: 'weddingPartyMember',
            method: HTTP_METHODS.GET,
            types: [TYPES.LOAD_WEDDING_PARTY_MEMBERS_REQUEST, TYPES.LOAD_WEDDING_PARTY_MEMBERS_SUCCESS, TYPES.LOAD_WEDDING_PARTY_MEMBERS_ERROR],
        },
    };
}

export function loadWeddingPartyMember(id) {
    return {
        [CALL_API]: {
            endpoint: `weddingPartyMember/${id}`,
            method: HTTP_METHODS.GET,
            authenticated: true,
            types: [TYPES.LOAD_WEDDING_PARTY_MEMBER_REQUEST, TYPES.LOAD_WEDDING_PARTY_MEMBER_SUCCESS, TYPES.LOAD_WEDDING_PARTY_MEMBER_ERROR],
        },
    };
}

export function createWeddingPartyMember(data) {
    return {
        [CALL_API]: {
            data,
            endpoint: 'weddingPartyMember',
            method: HTTP_METHODS.POST,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'Wedding party member created successfully' }));
                dispatch(push(WEDDING_PARTY_MEMBERS_ROUTE));
            },
            types: [TYPES.CREATE_WEDDING_PARTY_MEMBER_REQUEST, TYPES.CREATE_WEDDING_PARTY_MEMBER_SUCCESS, TYPES.CREATE_WEDDING_PARTY_MEMBER_ERROR],
        },
    };
}

export function updateWeddingPartyMember(data) {
    return {
        [CALL_API]: {
            data,
            endpoint: `weddingPartyMember/${data.id}`,
            method: HTTP_METHODS.PUT,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'Wedding party member updated successfully' }));
            },
            types: [TYPES.UPDATE_WEDDING_PARTY_MEMBER_REQUEST, TYPES.UPDATE_WEDDING_PARTY_MEMBER_SUCCESS, TYPES.UPDATE_WEDDING_PARTY_MEMBER_ERROR],
        },
    };
}

export function deleteWeddingPartyMember({ id }) {
    return {
        [CALL_API]: {
            endpoint: `weddingPartyMember/${id}`,
            method: HTTP_METHODS.DELETE,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'Wedding party member deleted successfully' }));
            },
            types: [TYPES.DELETE_WEDDING_PARTY_MEMBER_REQUEST, TYPES.DELETE_WEDDING_PARTY_MEMBER_SUCCESS, TYPES.DELETE_WEDDING_PARTY_MEMBER_ERROR],
        },
    };
}
