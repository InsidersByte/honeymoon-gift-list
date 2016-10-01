/* @flow */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css/animate.css';
import 'font-awesome/css/font-awesome.css';
import routes from './routes';
import alt from './helpers/alt';
import configureStore from './store/configureStore';
// FIXME:FLOW need to fix import .styl
import './index.styl';

const jwt = localStorage.getItem('jwt');

if (jwt !== null) {
    const user = jwtDecode(jwt);
    const expiryDate = new Date(0);
    expiryDate.setUTCSeconds(user.exp);

    // Check if the token is expired
    if (new Date() < expiryDate) {
        alt.bootstrap(JSON.stringify({
            LoginStore: {
                jwt,
                user,
                isLoggedIn: true,
            },
        }));
    }
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app')
);
