/* @flow */

import React, { Component } from 'react';
import App from './App';
import DevTools from './DevTools';

const styles = {
    root: {
        height: '100%',
        width: '100%',
    },
};

export default class Root extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div style={styles.root}>
                <App {...this.props} />
                <DevTools />
            </div>
        );
    }
}
