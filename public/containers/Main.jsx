/* @flow */

import React, { Component } from 'react';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { lightGreen500 } from 'material-ui/styles/colors';

type PropsType = {
    children: React$Element<any>,
};

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: lightGreen500,
    },
});

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
