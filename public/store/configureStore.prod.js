/* @flow */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from '../redux';

module.exports = (initialState: Object) => {
    const enhancer = applyMiddleware(thunk, api);

    return createStore(rootReducer, initialState, enhancer);
};
