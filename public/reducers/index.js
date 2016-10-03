/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import users from './users';
import notifications from './notifications';
import weddingProfile from './weddingProfile';
import signUp from './signUp';
import setup from './setup';
import weddingPartyMembers from './weddingPartyMembers';
import weddingPartyMember from './weddingPartyMember';

export default combineReducers({
    auth,
    users,
    notifications,
    weddingProfile,
    signUp,
    setup,
    weddingPartyMembers,
    weddingPartyMember,
    routing,
});
