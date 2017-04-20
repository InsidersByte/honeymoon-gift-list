/* @flow */

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../App';

type PropsType = {
  store: Object,
};

const Root = ({ store }: PropsType) => (
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
);

export default Root;
