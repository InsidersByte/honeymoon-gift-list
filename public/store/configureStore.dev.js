/* @flow */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createLogger from 'redux-logger';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';
import api from '../middleware/api';

module.exports = (initialState: Object, history: any) => {
    const enhancer = compose(
        applyMiddleware(thunk, api, routerMiddleware(history), reduxImmutableStateInvariant(), createLogger()),
        DevTools.instrument()
    );

    const store = createStore(rootReducer, initialState, enhancer);

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        // FIXME:FLOW ignore error
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
        );
    }

    return store;
};
