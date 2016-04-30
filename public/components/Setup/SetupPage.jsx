import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import setupActions from '../../actions/SetupActions';
import setupStore from '../../stores/SetupStore';
import NotificationActions from '../../actions/NotificationActions';
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

                    <SetupForm user={this.state.user} onChange={this.setUserState} onSubmit={this.submit} />
                </Jumbotron>
            </Col>
        );
    }
}
