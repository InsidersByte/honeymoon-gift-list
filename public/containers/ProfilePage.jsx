/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/users';
import * as notificationActions from '../actions/notifications';
import ProfileForm from '../components/ProfileForm';
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE, MATCHING_PASSWORD_MESSAGE } from '../constants';

type PropsType = {
    saving: boolean,
    actions: {
        changePassword: Function,
        error: Function,
    },
};

@connect(
    ({ users }) => users,
    dispatch => ({ actions: { ...bindActionCreators(userActions, dispatch), ...bindActionCreators(notificationActions, dispatch) } })
)
export default class ProfilePage extends React.Component {
    props: PropsType;

    state = {
        user: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    };

    onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        const user = Object.assign({}, this.state.user, { [name]: value });
        this.setState({ user });
    };

    submit = (event: SyntheticEvent) => {
        event.preventDefault();

        const { actions: { changePassword, error } } = this.props;
        const { user } = this.state;
        const { newPassword, confirmPassword } = user;

        if (newPassword.length < MINIMUM_PASSWORD_LENGTH) {
            error({ message: MINIMUM_PASSWORD_MESSAGE });
        } else if (newPassword !== confirmPassword) {
            error({ message: MATCHING_PASSWORD_MESSAGE });
        } else {
            changePassword(user);
        }
    };

    render() {
        const { saving } = this.props;
        const { user } = this.state;

        return (
            <ProfileForm
                user={user}
                onChange={this.onChange}
                onSubmit={this.submit}
                saving={saving}
            />
        );
    }
}
