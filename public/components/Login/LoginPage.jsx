import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import LoginForm from './LoginForm';
import NotificationActions from '../../actions/NotificationActions';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';
import PasswordResetActions from '../../actions/PasswordResetActions';
import PasswordResetStore from '../../stores/PasswordResetStore';
import { isEmail } from 'validator';
import Form from '../common/Form';

export default class Login extends React.Component {
    state = {
        user: {
            username: '',
            password: '',
        },
        saving: false,
    };

    componentDidMount() {
        PasswordResetStore.listen(this.onStoreChange);
        LoginStore.listen(this.onStoreChange);
    }

    componentWillUnmount() {
        PasswordResetStore.unlisten(this.onStoreChange);
        LoginStore.unlisten(this.onStoreChange);
    }

    onStoreChange = (state) => {
        const newState = { ...state, user: this.state.user };
        this.setState(newState);
    };

    setUserState = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        this.state.user[field] = value;
        return this.setState({ user: this.state.user });
    };

    submit = (event) => {
        event.preventDefault();
        LoginActions.login(this.state);
    };

    forgot = (event) => {
        event.preventDefault();

        const username = this.state.user.username;

        if (!username || !isEmail(username)) {
            NotificationActions.error({ message: 'We need your email address to reset your password!' });
            return;
        }

        PasswordResetActions.create({ username });
    };

    render() {
        return (
            <Col md={8} mdOffset={2}>
                <Jumbotron>
                    <h1>Login</h1>

                    <Form onSubmit={this.submit} loading={false} saving={this.state.saving} saveButtonText="Login">
                        <LoginForm user={this.state.user} onChange={this.setUserState} onForgot={this.forgot} />
                    </Form>
                </Jumbotron>
            </Col>
        );
    }
}
