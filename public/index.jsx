/* @flow */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import { TOKEN } from './constants';
import jwtDecoder from './utils/jwtDecoder';
import { getItem } from './utils/localStorage';
import './index.styl';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let initialState = {};

const jwt = getItem(TOKEN);
const user = jwtDecoder(jwt);

if (user) {
    initialState = {
        auth: {
            user,
            isAuthenticated: true,
        },
    };
}

const store = configureStore(initialState);

ReactDOM.render(
    // FIXME:FLOW works
    <Root store={store} />,
    document.getElementById('app'),
);
