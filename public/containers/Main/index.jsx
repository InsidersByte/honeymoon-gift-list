/* @flow */

import React from 'react';
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

const Main = ({ children }: PropsType) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    {children}
  </MuiThemeProvider>
);

export default Main;
