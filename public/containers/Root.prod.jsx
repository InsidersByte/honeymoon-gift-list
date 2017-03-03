/* @flow */

import React from 'react';
import App from './App';

const styles = {
    root: {
        height: '100%',
        width: '100%',
    },
};

const Root = (props: Object) => (
    <div style={styles.root}>
        <App {...props} />
    </div>
);

export default Root;
