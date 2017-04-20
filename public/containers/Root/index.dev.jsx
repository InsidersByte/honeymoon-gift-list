/* @flow */

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DevTools from '../DevTools';
import App from '../App';

type PropsType = {
  store: Object,
};

const styles = {
  root: {
    height: '100%',
    width: '100%',
  },
};

const Root = ({ store }: PropsType) => (
  <Provider store={store}>
    <div style={styles.root}>
      <Router>
        <Route component={App} />
      </Router>

      <DevTools />
    </div>
  </Provider>
);

export default Root;
