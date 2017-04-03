/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { browserHistory } from 'react-router';
import { success, error } from '../redux/notifications';
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE, MATCHING_PASSWORD_MESSAGE } from '../constants';
import SetupForm from '../components/SetupForm';
import api from '../api';
import { HTTP_METHODS } from '../constants/api';
import { ADMIN_ROUTE } from '../constants/routes';

type PropsType = {
    onSuccess: Function,
    onError: Function,
};

type LocalStateType = {
    user: {
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
    },
    saving: boolean,
};

export class SetupPage extends Component<void, PropsType, LocalStateType> {
    state = {
        user: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        saving: false,
    };

    onChange = ({ target }: SyntheticEvent) => {
        if (!(target instanceof HTMLInputElement)) {
            return;
        }

        const { name, value } = target;
        const user = { ...this.state.user, [name]: value };
        this.setState({ user });
    };

    submit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const { onSuccess, onError } = this.props;
        const { user } = this.state;
        const { password, confirmPassword } = user;

        if (password.length < MINIMUM_PASSWORD_LENGTH) {
            onError({ message: MINIMUM_PASSWORD_MESSAGE });
            return;
        }

        if (password !== confirmPassword) {
            onError({ message: MATCHING_PASSWORD_MESSAGE });
            return;
        }

        this.setState({ saving: true });

        try {
            await api({ endpoint: 'setup', method: HTTP_METHODS.POST, data: user });
            onSuccess({ message: 'You are all setup up' });
            browserHistory.push(ADMIN_ROUTE);
        } catch (err) {
            onError(err);
        } finally {
            this.setState({ saving: false });
        }
    };

    render() {
        const { user, saving } = this.state;

        return (
            <SetupForm
                user={user}
                onChange={this.onChange}
                onSubmit={this.submit}
                saving={saving}
            />
        );
    }
}

const connector: Connector<PropsType, PropsType> = connect(
    null,
    { onSuccess: success, onError: error },
);

export default connector(SetupPage);
