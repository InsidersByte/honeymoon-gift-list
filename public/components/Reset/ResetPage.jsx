import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import NotificationActions from '../../actions/NotificationActions';
import passwordResetActions from '../../actions/PasswordResetActions';
import passwordResetStore from '../../stores/PasswordResetStore';
import ResetForm from './ResetForm';
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE, MATCHING_PASSWORD_MESSAGE } from '../../constants';

export default class ResetPage extends React.Component {
    static propTypes = {
        params: React.PropTypes.shape({ token: React.PropTypes.string }).isRequired,
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

        const { user } = this.state;
        const { password, confirmPassword } = user;

        if (password.length < MINIMUM_PASSWORD_LENGTH) {
            NotificationActions.error({ message: MINIMUM_PASSWORD_MESSAGE });
        } else if (password !== confirmPassword) {
            NotificationActions.error({ message: MATCHING_PASSWORD_MESSAGE });
        } else {
            passwordResetActions.update({ token: this.props.params.token, ...user });
        }
    };

    render() {
        return (
            <Col md={8} mdOffset={2}>
                <Jumbotron>
                    <h1>Reset Password</h1>

                    <ResetForm user={this.state.user} onChange={this.setUserState} onSubmit={this.submit} saving={this.state.saving} />
                </Jumbotron>
            </Col>
        );
    }
}
