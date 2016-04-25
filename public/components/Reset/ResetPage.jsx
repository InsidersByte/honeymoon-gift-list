import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import authenticateActions from '../../actions/PasswordResetActions';
import authenticateStore from '../../stores/PasswordResetStore';
import ResetForm from './ResetForm';

export default class ResetPage extends React.Component {
    static propTypes = {
        params: React.PropTypes.object.isRequired,
        toastSuccess: React.PropTypes.func,
        toastError: React.PropTypes.func,
    };

    static defaultProps = {
        params: {},
    };

    state = {
        user: {
            password: '',
            confirmPassword: '',
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
        }

        authenticateActions.update({ token: this.props.params.token, ...this.state.user });
    };

    render() {
        return (
            <Col md={6} mdOffset={3}>
                <Jumbotron>
                    <h1>Reset Password</h1>

                    <ResetForm user={this.state.user} onChange={this.setUserState} onSubmit={this.submit} />
                </Jumbotron>
            </Col>
        );
    }
}
