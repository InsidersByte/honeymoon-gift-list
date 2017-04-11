/* @flow */

import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import users, * as fromUsers from './users';
import notifications from './notifications';
import weddingProfile from '../reducers/weddingProfile';
import signUp from '../reducers/signUp';
import weddingPartyMembers from '../reducers/weddingPartyMembers';
import weddingPartyMember from '../reducers/weddingPartyMember';
import gifts from '../reducers/gifts';
import sections from '../redux/sections';
import basket, * as fromBasket from './basket';
import giftSet from '../reducers/giftSet';
import giftSets from '../reducers/giftSets';
import type { StateType, AuthUser, UsersType } from '../types';

export default combineReducers({
  auth,
  users,
  notifications,
  weddingProfile,
  signUp,
  weddingPartyMembers,
  weddingPartyMember,
  gifts,
  sections,
  basket,
  giftSet,
  giftSets,
});

// TODO: Refactor to auth when it's refactored
export const getLoggedInUser = (state: StateType): AuthUser => state.auth.user;

export const getBasketCount = (state: StateType): number => fromBasket.getBasketCount(state.basket);
export const getBasketTotal = (state: StateType): number => fromBasket.getBasketTotal(state.basket);

export const getActiveUsers = (state: StateType): UsersType => fromUsers.getActiveUsers(state.users);
export const getInvitedUsers = (state: StateType): UsersType => fromUsers.getInvitedUsers(state.users);
export const getIsModalOpen = (state: StateType): boolean => fromUsers.getIsModalOpen(state.users);
export const getIsLoading = (state: StateType): boolean => fromUsers.getIsLoading(state.users);
export const getIsSaving = (state: StateType): boolean => fromUsers.getIsSaving(state.users);
export const getIsDeleting = (state: StateType): boolean => fromUsers.getIsDeleting(state.users);
