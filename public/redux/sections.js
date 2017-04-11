// @flow

import { combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { success } from './notifications';
import { CALL_API } from '../middleware/api';
import { HTTP_METHODS } from '../constants/api';
import { SECTIONS_ROUTE } from '../constants/routes';
import { move } from '../utils/sortingHelper';
import type { ActionType, SectionType, SectionsType, SectionIdType, SectionsStateType } from '../types';

const LOAD_SECTIONS_REQUEST = 'our-wedding-heroes/sections/LOAD_SECTIONS_REQUEST';
const LOAD_SECTIONS_SUCCESS = 'our-wedding-heroes/sections/LOAD_SECTIONS_SUCCESS';
const LOAD_SECTIONS_ERROR = 'our-wedding-heroes/sections/LOAD_SECTIONS_ERROR';
const LOAD_SECTION_REQUEST = 'our-wedding-heroes/sections/LOAD_SECTION_REQUEST';
const LOAD_SECTION_SUCCESS = 'our-wedding-heroes/sections/LOAD_SECTION_SUCCESS';
const LOAD_SECTION_ERROR = 'our-wedding-heroes/sections/LOAD_SECTION_ERROR';
const CREATE_SECTION_REQUEST = 'our-wedding-heroes/sections/CREATE_SECTION_REQUEST';
const CREATE_SECTION_SUCCESS = 'our-wedding-heroes/sections/CREATE_SECTION_SUCCESS';
const CREATE_SECTION_ERROR = 'our-wedding-heroes/sections/CREATE_SECTION_ERROR';
const UPDATE_SECTION_REQUEST = 'our-wedding-heroes/sections/UPDATE_SECTION_REQUEST';
const UPDATE_SECTION_SUCCESS = 'our-wedding-heroes/sections/UPDATE_SECTION_SUCCESS';
const UPDATE_SECTION_ERROR = 'our-wedding-heroes/sections/UPDATE_SECTION_ERROR';
const DELETE_SECTION_REQUEST = 'our-wedding-heroes/sections/DELETE_SECTION_REQUEST';
const DELETE_SECTION_SUCCESS = 'our-wedding-heroes/sections/DELETE_SECTION_SUCCESS';
const DELETE_SECTION_ERROR = 'our-wedding-heroes/sections/DELETE_SECTION_ERROR';
const MOVE_SECTION = 'our-wedding-heroes/sections/MOVE_SECTION';

const isLoading = (state: boolean = false, action: ActionType): boolean => {
  switch (action.type) {
    case LOAD_SECTIONS_REQUEST:
    case LOAD_SECTION_REQUEST:
      return true;
    case LOAD_SECTIONS_SUCCESS:
    case LOAD_SECTIONS_ERROR:
    case LOAD_SECTION_SUCCESS:
    case LOAD_SECTION_ERROR:
      return false;
    default:
      return state;
  }
};

const isSaving = (state: boolean = false, action: ActionType): boolean => {
  switch (action.type) {
    case CREATE_SECTION_REQUEST:
    case UPDATE_SECTION_REQUEST:
      return true;
    case CREATE_SECTION_SUCCESS:
    case CREATE_SECTION_ERROR:
    case UPDATE_SECTION_SUCCESS:
    case UPDATE_SECTION_ERROR:
      return false;
    default:
      return state;
  }
};

const isDeleting = (state: boolean = false, action: ActionType): boolean => {
  switch (action.type) {
    case DELETE_SECTION_REQUEST:
      return true;
    case DELETE_SECTION_SUCCESS:
    case DELETE_SECTION_ERROR:
      return false;
    default:
      return state;
  }
};

const section = (state: ?SectionType, action: ActionType): ?SectionType => {
  switch (action.type) {
    case LOAD_SECTION_SUCCESS:
    case CREATE_SECTION_SUCCESS:
    case UPDATE_SECTION_SUCCESS: {
      if (!state) {
        return action.payload;
      }

      return state.id === action.payload.id ? action.payload : state;
    }
    default:
      return state;
  }
};

const sections = (state: SectionsType = [], action: ActionType): SectionsType => {
  switch (action.type) {
    case LOAD_SECTIONS_SUCCESS:
      return action.payload;
    case LOAD_SECTION_SUCCESS:
    case CREATE_SECTION_SUCCESS:
    case UPDATE_SECTION_SUCCESS: {
      const idToFind = action.payload.id;
      const existingSection = state.find(({ id }) => id === idToFind);

      if (!existingSection) {
        return [...state, section(undefined, action)];
      }

      return state.map(s => section(s, action));
    }
    case DELETE_SECTION_REQUEST: {
      const idToRemove = action.payload.id;
      return state.filter(({ id }) => id !== idToRemove);
    }
    case MOVE_SECTION:
      return move({ ...action.payload, data: state });
    default:
      return state;
  }
};

export default combineReducers({ isLoading, isSaving, isDeleting, sections });

export const moveSection = (payload: { sourceId: SectionIdType, targetId: SectionIdType }): ActionType => ({ type: MOVE_SECTION, payload });

export const loadSections = () => ({
  [CALL_API]: {
    endpoint: 'section',
    method: HTTP_METHODS.GET,
    types: [LOAD_SECTIONS_REQUEST, LOAD_SECTIONS_SUCCESS, LOAD_SECTIONS_ERROR],
  },
});

export const loadSection = (id: SectionIdType) => ({
  [CALL_API]: {
    endpoint: `section/${id}`,
    method: HTTP_METHODS.GET,
    authenticated: true,
    types: [LOAD_SECTION_REQUEST, LOAD_SECTION_SUCCESS, LOAD_SECTION_ERROR],
  },
});

export const createSection = (data: SectionType) => ({
  [CALL_API]: {
    data,
    endpoint: 'section',
    method: HTTP_METHODS.POST,
    authenticated: true,
    onSuccess: dispatch => {
      dispatch(success({ message: 'Section created successfully' }));
      browserHistory.push(SECTIONS_ROUTE);
    },
    types: [CREATE_SECTION_REQUEST, CREATE_SECTION_SUCCESS, CREATE_SECTION_ERROR],
  },
});

export const updateSection = (data: SectionType) => ({
  [CALL_API]: {
    data,
    endpoint: `section/${data.id}`,
    method: HTTP_METHODS.PUT,
    authenticated: true,
    onSuccess: dispatch => {
      dispatch(success({ message: 'Section updated successfully' }));
    },
    types: [UPDATE_SECTION_REQUEST, UPDATE_SECTION_SUCCESS, UPDATE_SECTION_ERROR],
  },
});

export const deleteSection = ({ id }: SectionType) => ({
  [CALL_API]: {
    endpoint: `section/${id}`,
    method: HTTP_METHODS.DELETE,
    authenticated: true,
    onSuccess: dispatch => {
      dispatch(success({ message: 'Section deleted successfully' }));
    },
    types: [DELETE_SECTION_REQUEST, DELETE_SECTION_SUCCESS, DELETE_SECTION_ERROR],
  },
});

export const getSortedSections = (state: SectionsStateType): SectionsType => state.sections.sort((a, b) => a.position - b.position);
export const getIsLoading = (state: SectionsStateType): boolean => state.isLoading;
export const getIsSaving = (state: SectionsStateType): boolean => state.isSaving;
export const getIsDeleting = (state: SectionsStateType): boolean => state.isDeleting;
