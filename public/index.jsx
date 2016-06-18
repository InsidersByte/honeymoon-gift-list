import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import jwtDecode from 'jwt-decode';
import { whyDidYouUpdate } from 'why-did-you-update';

import history from './helpers/history';
import routes from './routes';
import alt from './helpers/alt';

import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css/animate.css';
import 'font-awesome/css/font-awesome.css';
import '@insidersbyte/react-markdown-editor/dist/css/react-markdown-editor.css';
import './index.styl';

if (process.env.NODE_ENV !== 'production') {
    whyDidYouUpdate(React);
}

const jwt = localStorage.getItem('jwt');

if (jwt !== null) {
    // TODO: maybe use final store here? http://survivejs.com/webpack_react/react_and_flux/
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

ReactDOM.render(
    <Router history={history}>
        {routes}
    </Router>,
    document.getElementById('content')
);
