import React from 'react';
import UserApi from '../../api/user.api';
import { Jumbotron, Button, Glyphicon } from 'react-bootstrap';
import UserTable from './UserTable';
import User from './User';

export default class Users extends React.Component {
    static propTypes = {
        toastSuccess: React.PropTypes.func,
        toastError: React.PropTypes.func,
    };

    state = {
        users: [],
        showModal: false,
        user: {},
    };

    componentDidMount() {
        this.loadUsers();
    }

    setUserState = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        this.state.user[field] = value;
        return this.setState({ user: this.state.user });
    };

    save = (user) => {
        UserApi
            .post(user)
            .then(() => {
                this.close();
                this.loadUsers();
                this.props.toastSuccess('User saved');
            })
            .catch((error) => {
                this.props.toastError('There was an error saving a user', error);
            });
    };

    delete = (user) => {
        // TODO: Use a confirmation model instead of confirm
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        UserApi
            .delete(user._id) // eslint-disable-line no-underscore-dangle
            .then(() => {
                this.loadUsers();
                this.props.toastSuccess('User deleted');
            })
            .catch((error) => {
                this.props.toastError('There was an error deleting a user', error);
            });
    };

    add = () => {
        this.setState({
            showModal: true,
            user: {
                name: '',
                username: '',
                password: '',
            },
        });
    };

    close = () => {
        this.setState({ showModal: false });
    };

    loadUsers() {
        UserApi
            .get()
            .then((response) => {
                this.setState({
                    users: response,
                });
            })
            .catch((error) => {
                this.props.toastError('There was an error getting users', error);
            });
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Users&nbsp;
                        <Button bsStyle="success" bsSize="small" onClick={this.add}><Glyphicon glyph="plus" /></Button>
                    </h1>

                    <UserTable users={this.state.users} onEdit={this.open} onDelete={this.delete} />
                </Jumbotron>

                <User
                    user={this.state.user}
                    show={this.state.showModal}
                    onHide={this.close}
                    onSubmit={this.save}
                    onChange={this.setUserState}
                />
            </div>
        );
    }
}
