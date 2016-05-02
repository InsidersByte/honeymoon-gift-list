import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import setupActions from '../../actions/SetupActions';
import setupStore from '../../stores/SetupStore';
import NotificationActions from '../../actions/NotificationActions';
import SetupForm from './SetupForm';
import Form from '../common/Form';

export default class SetupPage extends React.Component {
    state = {
        user: {
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        saving: false,
    };

    componentDidMount() {
        setupStore.listen(this.onStoreChange);
    }

    componentWillUnmount() {
        setupStore.unlisten(this.onStoreChange);
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

        if (this.state.user.password !== this.state.user.confirmPassword) {
            NotificationActions.error({ message: 'Your new passwords must match' });
            return;
        }

        setupActions.create(this.state);
    };

    render() {
        return (
            <Col md={8} mdOffset={2}>
                <Jumbotron>
                    <h1>Setup</h1>

                    <Form onSubmit={this.submit} loading={false} saving={this.state.saving} saveButtonText="Setup">
                        <SetupForm user={this.state.user} onChange={this.setUserState} />
                    </Form>
                </Jumbotron>
            </Col>
        );
    }
}
