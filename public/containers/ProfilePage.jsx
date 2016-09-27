/* @flow */

import React from 'react';
import connect from 'alt-utils/lib/connectToStores';
import PasswordActions from '../actions/PasswordActions';
import PasswordStore from '../stores/PasswordStore';
import NotificationActions from '../actions/NotificationActions';
import ProfileForm from '../components/ProfileForm';
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE, MATCHING_PASSWORD_MESSAGE } from '../constants';

type PropsType = {
    saving: boolean,
};

@connect
export default class ProfilePage extends React.Component {
    static getStores = () => [PasswordStore];
    static getPropsFromStores = () => PasswordStore.getState();

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

        const { user } = this.state;
        const { newPassword, confirmPassword } = user;

        if (newPassword.length < MINIMUM_PASSWORD_LENGTH) {
            NotificationActions.error({ message: MINIMUM_PASSWORD_MESSAGE });
        } else if (newPassword !== confirmPassword) {
            NotificationActions.error({ message: MATCHING_PASSWORD_MESSAGE });
        } else {
            PasswordActions.update(user);
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
