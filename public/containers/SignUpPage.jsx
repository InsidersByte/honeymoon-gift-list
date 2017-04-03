/* @flow */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as signUpActions from '../actions/signUp';
import * as notificationActions from '../redux/notifications';
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE, MATCHING_PASSWORD_MESSAGE } from '../constants';
import SignUpForm from '../components/SignUpForm';

type PropsType = {
  user: {
    email: string,
  },
  loading: boolean,
  saving: boolean,
  params: {
    token: string,
  },
  actions: {
    loadSignUp: Function,
    signUp: Function,
    error: Function,
  },
};

@withRouter
@connect(
  ({ signUp }) => signUp,
  dispatch => ({ actions: { ...bindActionCreators(signUpActions, dispatch), ...bindActionCreators(notificationActions, dispatch) } })
)
export default class SignUpPage extends Component {
  props: PropsType;

  state = {
    user: {
      name: '',
      password: '',
      confirmPassword: '',
    },
  };

  componentDidMount() {
    const { params: { token }, actions: { loadSignUp } } = this.props;
    loadSignUp({ token });
  }

  onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    const user = Object.assign(this.state.user, { [name]: value });
    this.setState({ user });
  };

  onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const { params: { token }, actions: { signUp, error } } = this.props;
    const { user } = this.state;
    const { password, confirmPassword } = user;

    if (password.length < MINIMUM_PASSWORD_LENGTH) {
      error({ message: MINIMUM_PASSWORD_MESSAGE });
    } else if (password !== confirmPassword) {
      error({ message: MATCHING_PASSWORD_MESSAGE });
    } else {
      signUp({ ...user, token });
    }
  };

  render() {
    const { user } = this.state;
    const { loading, saving, user: loadedUser } = this.props;

    const mergedUser = Object.assign({}, loadedUser, user);

    return <SignUpForm user={mergedUser} loading={loading} saving={saving} onChange={this.onChange} onSubmit={this.onSubmit} />;
  }
}
