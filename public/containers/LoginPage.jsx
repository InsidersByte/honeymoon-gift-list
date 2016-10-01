/* @flow */

import React from 'react';
// import { isEmail } from 'validator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/auth';
import LoginForm from '../components/LoginForm';

type PropsType = {
    saving: boolean,
    actions: {
        login: Function,
    },
};

@connect(
    ({ auth: { saving } }) => ({ saving }),
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class Login extends React.Component {
    props: PropsType;

    state = {
        user: {
            email: '',
            password: '',
        },
    };

    setUserState = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        const user = Object.assign({}, this.state.user, { [name]: value });
        return this.setState({ user });
    };

    submit = (event: SyntheticEvent) => {
        event.preventDefault();

        const { actions: { login } } = this.props;
        const { user } = this.state;

        login(user);
    };

    forgot = (event: SyntheticEvent) => {
        event.preventDefault();

        // const email = this.state.user.email;
        //
        // if (!email || !isEmail(email)) {
        //     NotificationActions.error({ message: 'We need your email address to reset your password!' });
        //     return;
        // }
        //
        // PasswordResetActions.create({ email });
    };

    render() {
        const { saving } = this.props;
        const { user } = this.state;

        return (
            <LoginForm
                user={user}
                onChange={this.setUserState}
                onForgot={this.forgot}
                onSubmit={this.submit}
                saving={saving}
            />
        );
    }
}
