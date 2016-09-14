import React from 'react';
import { Jumbotron, Button, Glyphicon } from 'react-bootstrap';
import NotificationActions from '../../actions/NotificationActions';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import LoginStore from '../../stores/LoginStore';
import UserTable from './UserTable';
import User from './User';

export default class Users extends React.Component {
    state = { ...UserStore.getState(), showModal: false, loggedInUser: LoginStore.getState().user };

    componentDidMount() {
        UserStore.listen(this.onStoreChange);
        LoginStore.listen(this.onLoginStoreChange);
        UserActions.query.defer();
    }

    componentWillUnmount() {
        UserStore.unlisten(this.onStoreChange);
        LoginStore.unlisten(this.onLoginStoreChange);
    }

    onLoginStoreChange = (state) => {
        const { user } = state;
        this.setState({ loggedInUser: user });
    };

    onStoreChange = (state) => {
        if (this.state.removing && !state.removing) {
            UserActions.query.defer();
        }

        if (this.state.saving && !state.saving) {
            UserActions.query.defer();
            this.close();
        }

        this.setState(state);
    };

    setUserState = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        this.state.user[field] = value;
        return this.setState({ user: this.state.user });
    };

    save = (user) => {
        if (user.password !== user.confirmPassword) {
            NotificationActions.error({ message: 'Passwords must match!' });
            return;
        }

        UserActions.create({ user });
    };

    delete = (user) => {
        // TODO: Use a confirmation model instead of confirm
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        UserActions.remove(user);
    };

    add = () => {
        UserActions.reset();
        this.setState({ showModal: true });
    };

    close = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { users, user, showModal, saving, loggedInUser } = this.state;

        return (
            <div>
                <Jumbotron>
                    <h1>Users&nbsp;
                        <Button bsStyle="success" bsSize="small" onClick={this.add}><Glyphicon glyph="plus" /></Button>
                    </h1>

                    <UserTable users={users} loggedInUser={loggedInUser} onDelete={this.delete} />
                </Jumbotron>

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
