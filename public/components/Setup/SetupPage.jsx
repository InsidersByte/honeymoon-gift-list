import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import setupApi from '../../api/setup.api';
import SetupForm from './SetupForm.jsx';

class SetupPage extends React.Component {
    constructor() {
        super();

        this.state = {
            user: {},
        };

        this.setUserState = this.setUserState.bind(this);
        this.submit = this.submit.bind(this);
    }

    setUserState(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.state.user[field] = value;
        return this.setState({ user: this.state.user });
    }

    submit(event) {
        event.preventDefault();

        setupApi
            .post(this.state.user)
            .then(() => {
                this.props.toastSuccess('Setup successful');
            })
            .catch(() => {
                this.props.toastError('There was an error setting up');
            });
    }

    render() {
        return (
            <Col md={6} mdOffset={3}>
                <Jumbotron>
                    <h1>Setup</h1>

                    <SetupForm user={this.state.user} onChange={this.setUserState} onSubmit={this.submit} />
                </Jumbotron>
            </Col>
        );
    }
}

SetupPage.propTypes = {
    toastSuccess: React.PropTypes.func,
    toastError: React.PropTypes.func,
};

export default SetupPage;
