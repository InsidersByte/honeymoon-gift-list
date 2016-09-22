import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import setupActions from '../../actions/SetupActions';
import setupStore from '../../stores/SetupStore';
import NotificationActions from '../../actions/NotificationActions';
import SetupForm from './SetupForm';
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE, MATCHING_PASSWORD_MESSAGE } from '../../constants';

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

        const { user: { password, confirmPassword } } = this.state;

        if (password.length < MINIMUM_PASSWORD_LENGTH) {
            NotificationActions.error({ message: MINIMUM_PASSWORD_MESSAGE });
        } else if (password !== confirmPassword) {
            NotificationActions.error({ message: MATCHING_PASSWORD_MESSAGE });
        } else {
            setupActions.create(this.state);
        }
    };

    render() {
        return (
            <Col md={8} mdOffset={2}>
                <Jumbotron>
                    <h1>Setup</h1>

                    <SetupForm user={this.state.user} onChange={this.setUserState} onSubmit={this.submit} saving={this.state.saving} />
                </Jumbotron>
            </Col>
        );
    }
}
