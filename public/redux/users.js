// @flow

import { combineReducers } from 'redux';
import { success } from './notifications';
import { CALL_API } from '../middleware/api';
import { HTTP_METHODS } from '../constants/api';
import type { ActionType, UsersType, UserType, UsersStateType } from '../types';

const OPEN_USER_MODAL = 'our-wedding-heroes/users/OPEN_USER_MODAL';
const CLOSE_USER_MODAL = 'our-wedding-heroes/users/CLOSE_USER_MODAL';
const LOAD_USERS_REQUEST = 'our-wedding-heroes/users/LOAD_USERS_REQUEST';
const LOAD_USERS_SUCCESS = 'our-wedding-heroes/users/LOAD_USERS_SUCCESS';
const LOAD_USERS_ERROR = 'our-wedding-heroes/users/LOAD_USERS_ERROR';
const CREATE_USER_REQUEST = 'our-wedding-heroes/users/CREATE_USER_REQUEST';
const CREATE_USER_SUCCESS = 'our-wedding-heroes/users/CREATE_USER_SUCCESS';
const CREATE_USER_ERROR = 'our-wedding-heroes/users/CREATE_USER_ERROR';
const DELETE_USER_REQUEST = 'our-wedding-heroes/users/DELETE_USER_REQUEST';
const DELETE_USER_SUCCESS = 'our-wedding-heroes/users/DELETE_USER_SUCCESS';
const DELETE_USER_ERROR = 'our-wedding-heroes/users/DELETE_USER_ERROR';
const CHANGE_PASSWORD_REQUEST = 'our-wedding-heroes/users/CHANGE_PASSWORD_REQUEST';
const CHANGE_PASSWORD_SUCCESS = 'our-wedding-heroes/users/CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_ERROR = 'our-wedding-heroes/users/CHANGE_PASSWORD_ERROR';

const isModalOpen = (state: boolean = false, action: ActionType): boolean => {
  switch (action.type) {
    case OPEN_USER_MODAL:
      return true;
    case CLOSE_USER_MODAL:
      return false;
    default:
      return state;
  }
};

const isLoading = (state: boolean = false, action: ActionType): boolean => {
  switch (action.type) {
    case LOAD_USERS_REQUEST:
      return true;
    case LOAD_USERS_SUCCESS:
    case LOAD_USERS_ERROR:
      return false;
    default:
      return state;
  }
};

const isSaving = (state: boolean = false, action: ActionType): boolean => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return true;
    case CREATE_USER_SUCCESS:
    case CREATE_USER_ERROR:
      return false;
    default:
      return state;
  }
};

const isDeleting = (state: boolean = false, action: ActionType): boolean => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return true;
    case DELETE_USER_SUCCESS:
    case DELETE_USER_ERROR:
      return false;
    default:
      return state;
  }
};

const users = (state: UsersType = [], action: ActionType): UsersType => {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return action.payload;
    case CREATE_USER_SUCCESS:
      return [...state, action.payload];
    case DELETE_USER_REQUEST: {
      const idToRemove = action.payload.id;
      return state.filter(({ id }) => id !== idToRemove);
    }
    default:
      return state;
  }
};

export default combineReducers({ isModalOpen, isLoading, isSaving, isDeleting, users });

export const openUserModal = (): ActionType => ({ type: OPEN_USER_MODAL });
export const closeUserModal = (): ActionType => ({ type: CLOSE_USER_MODAL });

export const loadUsers = () => ({
  [CALL_API]: {
    endpoint: 'user',
    method: HTTP_METHODS.GET,
    authenticated: true,
    types: [LOAD_USERS_REQUEST, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR],
  },
});

export const createUser = (user: UserType) => ({
  [CALL_API]: {
    data: user,
    endpoint: 'user',
    method: HTTP_METHODS.POST,
    authenticated: true,
    onSuccess: dispatch => {
      dispatch(success({ message: 'User created successfully' }));
      dispatch(closeUserModal());
    },
    types: [CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR],
  },
});

export const deleteUser = (user: UserType) => ({
  [CALL_API]: {
    data: user,
    endpoint: `user/${user.id}`,
    method: HTTP_METHODS.DELETE,
    authenticated: true,
    onSuccess: dispatch => {
      dispatch(success({ message: 'User deleted successfully' }));
    },
    types: [DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_ERROR],
  },
});

// TODO: extract to profile
export const changePassword = (user: UserType) => ({
  [CALL_API]: {
    data: user,
    endpoint: 'user/password',
    method: HTTP_METHODS.PUT,
    authenticated: true,
    onSuccess: dispatch => {
      dispatch(success({ message: 'Password Changed' }));
    },
    types: [CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR],
  },
});

export const getActiveUsers = (state: UsersStateType): UsersType => state.users.filter(({ status }) => status === 'active');
export const getInvitedUsers = (state: UsersStateType): UsersType => state.users.filter(({ status }) => status === 'invited' || status === 'invite_pending');
export const getIsLoading = (state: UsersStateType): boolean => state.isLoading;
export const getIsSaving = (state: UsersStateType): boolean => state.isSaving;
export const getIsDeleting = (state: UsersStateType): boolean => state.isDeleting;
export const getIsModalOpen = (state: UsersStateType): boolean => state.isModalOpen;
