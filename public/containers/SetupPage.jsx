/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as setupActions from '../actions/setup';
import * as notificationActions from '../redux/notifications';
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE, MATCHING_PASSWORD_MESSAGE } from '../constants';
import SetupForm from '../components/SetupForm';

type PropsType = {
    saving: boolean,
    actions: {
        setup: Function,
        error: Function,
    },
};

@connect(
    ({ setup }) => setup,
    dispatch => ({ actions: { ...bindActionCreators(setupActions, dispatch), ...bindActionCreators(notificationActions, dispatch) } }),
)
export default class SetupPage extends React.Component {
    props: PropsType;

    state = {
        user: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    };

    onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        const user = Object.assign({}, this.state.user, { [name]: value });
        return this.setState({ user });
    };

    submit = (event: SyntheticEvent) => {
        event.preventDefault();

        const { actions: { setup, error } } = this.props;
        const { user } = this.state;
        const { password, confirmPassword } = user;

        if (password.length < MINIMUM_PASSWORD_LENGTH) {
            error({ message: MINIMUM_PASSWORD_MESSAGE });
        } else if (password !== confirmPassword) {
            error({ message: MATCHING_PASSWORD_MESSAGE });
        } else {
            setup(user);
        }
    };

    render() {
        const { saving } = this.props;
        const { user } = this.state;

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
