import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import auth from '../../helpers/auth';
import LoginForm from './LoginForm';
import NotificationActions from '../../actions/NotificationActions';
import authenticateActions from '../../actions/PasswordResetActions';
import authenticateStore from '../../stores/PasswordResetStore';
import { isEmail } from 'validator';

export default class Login extends React.Component {
    static propTypes = {
        toastSuccess: React.PropTypes.func,
        toastError: React.PropTypes.func,
    };

    state = {
        user: {
            username: '',
            password: '',
        },
    };

    componentDidMount() {
        authenticateStore.listen(this.onStoreChange);
    }

    componentWillUnmount() {
        authenticateStore.unlisten(this.onStoreChange);
    }

    onStoreChange = (state) => {
        this.setState(state);
    } ;

    setUserState = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        this.state.user[field] = value;
        return this.setState({ user: this.state.user });
    };

    submit = (event) => {
        event.preventDefault();

        auth
            .login(this.state.user)
            .then(() => {
                this.props.toastSuccess('Logged in');
            })
            .catch((error) => {
                this.props.toastError('There was an error logging in', error);
            });
    };

    forgot = (event) => {
        event.preventDefault();

        const username = this.state.user.username;

        if (!username || !isEmail(username)) {
            NotificationActions.error({ message: 'We need your email address to reset your password!' });
            return;
        }

        authenticateActions.create({ username });
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
