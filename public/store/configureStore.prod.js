/* @flow */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import api from '../middleware/api';
import rootReducer from '../reducers';

module.exports = (initialState: Object, history: any) => {
    const enhancer = applyMiddleware(thunk, api, routerMiddleware(history));

    return createStore(rootReducer, initialState, enhancer);
};
