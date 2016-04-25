import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import passwordActions from '../../actions/PasswordActions';
import passwordStore from '../../stores/PasswordStore';
import loginStore from '../../stores/LoginStore';
import ProfileForm from './ProfileForm';

export default class ProfilePage extends React.Component {
    static propTypes = {
        toastSuccess: React.PropTypes.func,
        toastError: React.PropTypes.func,
    };

    state = {
        user: {
            username: loginStore.getState().user.username,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    };

    componentDidMount() {
        passwordStore.listen(this.onStoreChange);
    }

    componentWillUnmount() {
        passwordStore.unlisten(this.onStoreChange);
    }

    onStoreChange = (state) => {
        this.setState(state);
    };

    onChange = ({ target: { name, value } }) => {
        const user = Object.assign(this.state.user, { [name]: value });
        this.setState({ user });
    };

    submit = (event) => {
        event.preventDefault();

        if (this.state.user.newPassword !== this.state.user.confirmPassword) {
            this.props.toastError('Your new passwords must match');
        }

        passwordActions.update(this.state.user);
    };

    render() {
        return (
            <Col md={8} mdOffset={2}>
                <Jumbotron>
                    <h1>Change Your Password</h1>

                    <ProfileForm user={this.state.user} onChange={this.onChange} onSubmit={this.submit} />
                </Jumbotron>
            </Col>
        );
    }
}
