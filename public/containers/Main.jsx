/* @flow */

import React, { Component } from 'react';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';

type PropsType = {
    children: React$Element<any>,
};

const muiTheme = getMuiTheme();

export default class Main extends Component { // eslint-disable-line react/prefer-stateless-function
    props: PropsType;

    render() {
        const { children } = this.props;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                {children}
            </MuiThemeProvider>
        );
    }
}
