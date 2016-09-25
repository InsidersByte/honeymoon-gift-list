/* @flow */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import jwtDecode from 'jwt-decode';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css/animate.css';
import 'font-awesome/css/font-awesome.css';
import history from './helpers/history';
import routes from './routes';
import alt from './helpers/alt';
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

ReactDOM.render(
    <Router history={history}>
        {routes}
    </Router>,
    document.getElementById('app')
);
