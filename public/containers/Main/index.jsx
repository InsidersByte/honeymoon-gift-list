/* @flow */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { lightGreen500 } from 'material-ui/styles/colors';
import LandingPage from '../LandingPage';
import BasketSummaryPage from '../BasketSummaryPage';
import GiverDetailsPage from '../GiverDetailsPage';
import ConfirmationPage from '../ConfirmationPage';
import NoMatch from '../../components/NoMatch';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen500,
  },
});

const Main = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/basket" component={BasketSummaryPage} />
      <Route path="/giver" component={GiverDetailsPage} />
      <Route path="/confirmation/:giftSetId" component={ConfirmationPage} />
      <Route component={NoMatch} />
    </Switch>
  </MuiThemeProvider>
);

export default Main;
