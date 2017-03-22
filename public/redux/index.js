/* @flow */

import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import users from '../reducers/users';
import notifications from './notifications';
import weddingProfile from '../reducers/weddingProfile';
import signUp from '../reducers/signUp';
import setup from '../reducers/setup';
import weddingPartyMembers from '../reducers/weddingPartyMembers';
import weddingPartyMember from '../reducers/weddingPartyMember';
import gifts from '../reducers/gifts';
import sections from '../reducers/sections';
import section from '../reducers/section';
import basket from './basket';
import giftSet from '../reducers/giftSet';
import giftSets from '../reducers/giftSets';

export default combineReducers({
    auth,
    users,
    notifications,
    weddingProfile,
    signUp,
    setup,
    weddingPartyMembers,
    weddingPartyMember,
    gifts,
    sections,
    section,
    basket,
    giftSet,
    giftSets,
});
