import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import { success } from './notifications';
import { CALL_API } from '../middleware/api';
import * as TYPES from '../constants/actionTypes';
import { HTTP_METHODS } from '../constants/api';
import { SECTIONS_ROUTE } from '../constants/routes';

export const moveSection = createAction(TYPES.MOVE_SECTION);

export function loadSections() {
    return {
        [CALL_API]: {
            endpoint: 'section',
            method: HTTP_METHODS.GET,
            types: [TYPES.LOAD_SECTIONS_REQUEST, TYPES.LOAD_SECTIONS_SUCCESS, TYPES.LOAD_SECTIONS_ERROR],
        },
    };
}

export function loadSection(id) {
    return {
        [CALL_API]: {
            endpoint: `section/${id}`,
            method: HTTP_METHODS.GET,
            authenticated: true,
            types: [TYPES.LOAD_SECTION_REQUEST, TYPES.LOAD_SECTION_SUCCESS, TYPES.LOAD_SECTION_ERROR],
        },
    };
}

export function createSection(data) {
    return {
        [CALL_API]: {
            data,
            endpoint: 'section',
            method: HTTP_METHODS.POST,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'Section created successfully' }));
                dispatch(push(SECTIONS_ROUTE));
            },
            types: [TYPES.CREATE_SECTION_REQUEST, TYPES.CREATE_SECTION_SUCCESS, TYPES.CREATE_SECTION_ERROR],
        },
    };
}

export function updateSection(data) {
    return {
        [CALL_API]: {
            data,
            endpoint: `section/${data.id}`,
            method: HTTP_METHODS.PUT,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'Section updated successfully' }));
            },
            types: [TYPES.UPDATE_SECTION_REQUEST, TYPES.UPDATE_SECTION_SUCCESS, TYPES.UPDATE_SECTION_ERROR],
        },
    };
}

export function deleteSection({ id }) {
    return {
        [CALL_API]: {
            endpoint: `section/${id}`,
            method: HTTP_METHODS.DELETE,
            authenticated: true,
            onSuccess: (dispatch) => {
                dispatch(success({ message: 'Section deleted successfully' }));
            },
            types: [TYPES.DELETE_SECTION_REQUEST, TYPES.DELETE_SECTION_SUCCESS, TYPES.DELETE_SECTION_ERROR],
        },
    };
}
