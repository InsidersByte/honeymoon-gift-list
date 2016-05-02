import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import LoginForm from './LoginForm';
import NotificationActions from '../../actions/NotificationActions';
import LoginActions from '../../actions/LoginActions';
import PasswordResetActions from '../../actions/PasswordResetActions';
import PasswordResetStore from '../../stores/PasswordResetStore';
import { isEmail } from 'validator';

export default class Login extends React.Component {
    state = {
        user: {
            username: '',
            password: '',
        },
    };

    componentDidMount() {
        PasswordResetStore.listen(this.onStoreChange);
    }

    componentWillUnmount() {
        PasswordResetStore.unlisten(this.onStoreChange);
    }

    onStoreChange = (state) => {
        this.setState(state);
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

                    <LoginForm user={this.state.user} onChange={this.setUserState} onSubmit={this.submit} onForgot={this.forgot} />
                </Jumbotron>
            </Col>
        );
    }
}
