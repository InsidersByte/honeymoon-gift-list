/* @flow */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bootstrap/dist/css/bootstrap.css';
import routes from './routes';
import configureStore from './store/configureStore';
import { TOKEN } from './constants';
import jwtDecoder from './utils/jwtDecoder';
import './index.styl';

let initialState = {};

const jwt = localStorage.getItem(TOKEN);
const user = jwtDecoder(jwt);

if (user) {
    initialState = {
        auth: {
            user,
            isAuthenticated: true,
        },
    };
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes(store)}
        </Router>
    </Provider>,
    document.getElementById('app')
);
