/* @flow */

import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as actions from '../redux/notifications';
import Main from './Main';
import Admin from './Admin';

type PropsType = {
  notifications: Array<Object>,
  actions: {
    hideNotification: Function,
  },
};

const styles = {
  root: {
    height: '100%',
    width: '100%',
  },
  container: {
    height: '100%',
    width: '100%',
  },
};

@connect(
  ({ notifications }) => {
    const notificationsToShow = notifications.filter(({ show }) => show);

    return {
      notifications: notificationsToShow,
    };
  },
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class App extends Component {
  props: PropsType;

  componentWillReceiveProps({ notifications, actions: { hideNotification } }: PropsType) {
    if (notifications.length === 0) {
      return;
    }

    const { notificationSystem } = this;

    for (const notification of notifications) {
      notificationSystem.addNotification(notification);
      hideNotification(notification);
    }
  }

  notificationSystem: { addNotification: Function };

  render() {
    return (
      <div style={styles.root}>
        <div style={styles.container}>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route component={Main} />
          </Switch>
        </div>

        <NotificationSystem
          ref={c => {
            this.notificationSystem = c;
          }}
        />
      </div>
    );
  }
}
