/* @flow */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

module.exports = (initialState: Object, history: any) => {
    const enhancer = applyMiddleware(thunk, routerMiddleware(history));

    return createStore(rootReducer, initialState, enhancer);
};
