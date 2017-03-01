/* @flow */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'; // eslint-disable-line import/no-extraneous-dependencies
import createLogger from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
import DevTools from '../containers/DevTools';
import rootReducer from '../redux';
import api from '../middleware/api';

module.exports = (initialState: Object, history: any) => {
    const enhancer = compose(
        applyMiddleware(thunk, api, routerMiddleware(history), reduxImmutableStateInvariant(), createLogger()),
        DevTools.instrument(),
    );

    const store = createStore(rootReducer, initialState, enhancer);

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        // FIXME:FLOW ignore error
        module.hot.accept('../redux', () =>
            // FIXME:FLOW ignore error
            store.replaceReducer(require('../redux')), // eslint-disable-line global-require
        );
    }

    return store;
};
