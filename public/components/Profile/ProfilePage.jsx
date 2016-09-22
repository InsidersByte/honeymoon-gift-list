import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import passwordActions from '../../actions/PasswordActions';
import passwordStore from '../../stores/PasswordStore';
import loginStore from '../../stores/LoginStore';
import NotificationActions from '../../actions/NotificationActions';
import ProfileForm from './ProfileForm';
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE, MATCHING_PASSWORD_MESSAGE } from '../../constants';

export default class ProfilePage extends React.Component {
    state = {
        user: {
            username: loginStore.getState().user.username,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        saving: false,
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

        const { user: { newPassword, confirmPassword } } = this.state;

        if (newPassword.length < MINIMUM_PASSWORD_LENGTH) {
            NotificationActions.error({ message: MINIMUM_PASSWORD_MESSAGE });
        } else if (newPassword !== confirmPassword) {
            NotificationActions.error({ message: MATCHING_PASSWORD_MESSAGE });
        } else {
            passwordActions.update(this.state.user);
        }
    };

    render() {
        return (
            <Col md={8} mdOffset={2}>
                <Jumbotron>
                    <h1>Change Your Password</h1>

                    <ProfileForm
                        user={this.state.user}
                        onChange={this.onChange}
                        onSubmit={this.submit}
                        saving={this.state.saving}
                    />
                </Jumbotron>
            </Col>
        );
    }
}
