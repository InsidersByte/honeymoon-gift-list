/* @flow */

import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import users from './users';
import notifications from './notifications';
import weddingProfile from '../reducers/weddingProfile';
import signUp from '../reducers/signUp';
import weddingPartyMembers from '../reducers/weddingPartyMembers';
import weddingPartyMember from '../reducers/weddingPartyMember';
import gifts from '../reducers/gifts';
import sections from '../reducers/sections';
import section from '../reducers/section';
import basket, * as fromBasket from './basket';
import giftSet from '../reducers/giftSet';
import giftSets from '../reducers/giftSets';
import type { StateType } from '../types';

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
  section,
  basket,
  giftSet,
  giftSets,
});

export const getBasketCount = (state: StateType) => fromBasket.getBasketCount(state.basket);
export const getBasketTotal = (state: StateType) => fromBasket.getBasketTotal(state.basket);
