/* @flow */

import React from 'react';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';

type PropsType = {
  children: React$Element<any>,
};

const muiTheme = getMuiTheme();

const Admin = ({ children }: PropsType) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    {children}
  </MuiThemeProvider>
);

export default Admin;
