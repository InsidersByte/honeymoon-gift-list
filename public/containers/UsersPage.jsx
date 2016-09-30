/* @flow */

import React from 'react';
import connect from 'alt-utils/lib/connectToStores';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import LoginStore from '../stores/LoginStore';
import UserList from '../components/UserList';
import User from '../components/UserDialog';

type PropsType = {
    removing: boolean,
    saving: boolean,
    activeUsers: Array<{
        id: string,
        name: string,
        email: string,
    }>,
    invitedUsers: Array<{
        id: string,
        email: string,
    }>,
    loggedInUser: {
        email: string,
    },
};

const initialUser = {
    email: '',
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
    state = { open: false, user: { ...initialUser } };

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

    save = (event: SyntheticEvent) => {
        event.preventDefault();
        const { user } = this.state;
        UserActions.create({ user });
    };

    delete = (user: Object) => {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        UserActions.remove(user);
    };

    add = () => {
        this.setState({ open: true, user: { ...initialUser } });
    };

    close = () => {
        this.setState({ open: false });
    };

    render() {
        const { activeUsers, invitedUsers, saving, loggedInUser } = this.props;
        const { user, open } = this.state;

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
                    open={open}
                    onHide={this.close}
                    onSubmit={this.save}
                    onChange={this.setUserState}
                    saving={saving}
                />
            </div>
        );
    }
}
