/* @flow */

import React from 'react';
import App from './App';
import DevTools from './DevTools';

const styles = {
    root: {
        height: '100%',
        width: '100%',
    },
};

const Root = (props: Object) => (
    <div style={styles.root}>
        <App {...props} />
        <DevTools />
    </div>
);

export default Root;
