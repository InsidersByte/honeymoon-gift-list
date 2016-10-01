/* @flow */

import React, { Component } from 'react';
import App from './App';

const style = {
    height: '100%',
    width: '100%',
};

export default class Root extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div style={style}>
                <App {...this.props} style={style} />
            </div>
        );
    }
}
