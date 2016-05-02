import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import NotificationActions from '../../actions/NotificationActions';
import passwordResetActions from '../../actions/PasswordResetActions';
import passwordResetStore from '../../stores/PasswordResetStore';
import ResetForm from './ResetForm';
import Form from '../common/Form';

export default class ResetPage extends React.Component {
    static propTypes = {
        params: React.PropTypes.object.isRequired,
    };

    static defaultProps = {
        params: {},
    };

    state = {
        user: {
            password: '',
            confirmPassword: '',
        },
        saving: false,
    };

    componentDidMount() {
        passwordResetStore.listen(this.onStoreChange);
    }

    componentWillUnmount() {
        passwordResetStore.unlisten(this.onStoreChange);
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
        }

        passwordResetActions.update({ token: this.props.params.token, ...this.state.user });
    };

    render() {
        return (
            <Col md={8} mdOffset={2}>
                <Jumbotron>
                    <h1>Reset Password</h1>

                    <Form onSubmit={this.submit} loading={false} saving={this.state.saving} saveButtonText="Reset Password">
                        <ResetForm user={this.state.user} onChange={this.setUserState} />
                    </Form>
                </Jumbotron>
            </Col>
        );
    }
}
