/* @flow */

import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from '../../routes';

type PropsType = {
  store: Object,
};

const Root = ({ store }: PropsType) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes(store)}
    </Router>
  </Provider>
);

export default Root;
