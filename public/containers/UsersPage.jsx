/* @flow */

import React from 'react';
import connect from 'alt-utils/lib/connectToStores';
import NotificationActions from '../actions/NotificationActions';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import LoginStore from '../stores/LoginStore';
import UserList from '../components/UserList';
import User from '../components/Users/User';

type PropsType = {
    removing: boolean,
    saving: boolean,
    activeUsers: Array<{
        _id: string,
        name: string,
        username: string,
    }>,
    invitedUsers: Array<{
        _id: string,
        username: string,
    }>,
    loggedInUser: {
        username: string,
    },
};

const initialUser = {
    username: '',
};

@connect
export default class Users extends React.Component {
    static getStores = () => [LoginStore, UserStore];
    static getPropsFromStores = () => {
        const loggedInUser = LoginStore.getState().user;
        const { users, saving, removing } = UserStore.getState();

        const activeUsers = users.filter(({ status }) => status === 'active');
        const invitedUsers = users.filter(({ status }) => status === 'invited' || status === 'invite_pending');

        return {
            activeUsers,
            invitedUsers,
            saving,
            removing,
            loggedInUser,
        };
    };

    props: PropsType;
    state = { showModal: false, user: { ...initialUser } };

    componentDidMount() {
        UserActions.query.defer();
    }

    componentWillReceiveProps({ removing: nextRemoving, saving: nextSaving }: PropsType) {
        const { removing, saving } = this.props;

        if (removing && !nextRemoving) {
            UserActions.query.defer();
        }

        if (saving && !nextSaving) {
            UserActions.query.defer();
            this.close();
        }
    }

    setUserState = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        const user = Object.assign(this.state.user, { [name]: value });
        return this.setState({ user });
    };

    save = (user: Object) => {
        if (user.password !== user.confirmPassword) {
            NotificationActions.error({ message: 'Passwords must match!' });
            return;
        }

        UserActions.create({ user });
    };

    delete = (user: Object) => {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        UserActions.remove(user);
    };

    add = () => {
        this.setState({ showModal: true, user: { ...initialUser } });
    };

    close = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { activeUsers, invitedUsers, saving, loggedInUser } = this.props;
        const { user, showModal } = this.state;

        return (
            <div>
                <UserList
                    activeUsers={activeUsers}
                    invitedUsers={invitedUsers}
                    loggedInUser={loggedInUser}
                    onAdd={this.add}
                    onDelete={this.delete}
                />

                <User
                    user={user}
                    show={showModal}
                    onHide={this.close}
                    onSubmit={this.save}
                    onChange={this.setUserState}
                    saving={saving}
                />
            </div>
        );
    }
}
