/* @flow */

import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import DevTools from '../DevTools';
import routes from '../../routes';

type PropsType = {
    store: Object,
};

const styles = {
    root: {
        height: '100%',
        width: '100%',
    },
};

const Root = ({ store }: PropsType) => (
    <Provider store={store}>
        <div style={styles.root}>
            <Router history={browserHistory}>
                {routes(store)}
            </Router>

            <DevTools />
        </div>
    </Provider>
);

export default Root;
