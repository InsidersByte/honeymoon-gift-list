/* @flow */

import React, { Component } from 'react';
import App from './App';
import DevTools from './DevTools';

export default class Root extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <App {...this.props} />
                <DevTools />
            </div>
        );
    }
}
