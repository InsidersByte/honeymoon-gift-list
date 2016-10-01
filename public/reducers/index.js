/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import users from './users';
import notifications from './notifications';

export default combineReducers({
    auth,
    users,
    notifications,
    routing,
});
