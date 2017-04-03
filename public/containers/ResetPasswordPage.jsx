/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/auth';
import * as notificationActions from '../redux/notifications';
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE, MATCHING_PASSWORD_MESSAGE } from '../constants';
import ResetPasswordForm from '../components/ResetPasswordForm';

type PropsType = {
  saving: boolean,
  params: {
    token: string,
  },
  actions: {
    resetPassword: Function,
    error: Function,
  },
};

@connect(({ auth }) => auth, dispatch => ({ actions: { ...bindActionCreators(authActions, dispatch), ...bindActionCreators(notificationActions, dispatch) } }))
export default class ResetPasswordPage extends React.Component {
  props: PropsType;

  state = {
    user: {
      password: '',
      confirmPassword: '',
    },
  };

  setUserState = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    return this.setState({ user });
  };

  submit = (event: SyntheticEvent) => {
    event.preventDefault();

    const { params: { token }, actions: { resetPassword, error } } = this.props;
    const { user } = this.state;
    const { password, confirmPassword } = user;

    if (password.length < MINIMUM_PASSWORD_LENGTH) {
      error({ message: MINIMUM_PASSWORD_MESSAGE });
    } else if (password !== confirmPassword) {
      error({ message: MATCHING_PASSWORD_MESSAGE });
    } else {
      resetPassword({ ...user, token });
    }
  };

  render() {
    const { saving } = this.props;
    const { user } = this.state;

    return <ResetPasswordForm user={user} onChange={this.setUserState} onSubmit={this.submit} saving={saving} />;
  }
}
