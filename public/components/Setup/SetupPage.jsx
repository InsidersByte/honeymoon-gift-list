import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import setupApi from '../../api/setup.api';
import SetupForm from './SetupForm';

export default class SetupPage extends React.Component {
    static propTypes = {
        toastSuccess: React.PropTypes.func,
        toastError: React.PropTypes.func,
    };

    state = {
        user: {
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    };

    setUserState = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        this.state.user[field] = value;
        return this.setState({ user: this.state.user });
    };

    submit = (event) => {
        event.preventDefault();

        if (this.state.user.password !== this.state.user.confirmPassword) {
            this.props.toastError('Your new passwords must match');
            return;
        }

        setupApi
            .post(this.state.user)
            .then(() => {
                this.props.toastSuccess('Setup successful');
            })
            .catch((error) => {
                this.props.toastError('There was an error setting up', error);
            });
    };

    render() {
        return (
            <Col md={8} mdOffset={2}>
                <Jumbotron>
                    <h1>Setup</h1>

                    <SetupForm user={this.state.user} onChange={this.setUserState} onSubmit={this.submit} />
                </Jumbotron>
            </Col>
        );
    }
}
