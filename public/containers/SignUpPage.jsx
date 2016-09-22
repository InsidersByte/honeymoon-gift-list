import React, { Component, PropTypes } from 'react';
import connect from 'alt-utils/lib/connectToStores';
import { withRouter } from 'react-router';
import SignUpStore from '../stores/SignUpStore';
import SignUpActions from '../actions/SignUpActions';
import NotificationActions from '../actions/NotificationActions';
import SignUpForm from '../components/SignUpForm';
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_MESSAGE, MATCHING_PASSWORD_MESSAGE } from '../constants';

@withRouter
@connect
export default class SignUpPage extends Component {
    static propTypes = {
        user: PropTypes.shape({
            username: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
        }).isRequired,
        loading: PropTypes.bool.isRequired,
        saving: PropTypes.bool.isRequired,
        params: PropTypes.shape({
            token: PropTypes.string.isRequired,
        }),
    };

    static getStores = () => [SignUpStore];
    static getPropsFromStores = () => SignUpStore.getState();

    state = {
        user: {
            name: '',
            password: '',
            confirmPassword: '',
        },
    };

    componentDidMount() {
        SignUpActions.fetch(this.props.params.token);
    }

    onChange = ({ target: { name, value } }) => {
        const user = Object.assign(this.state.user, { [name]: value });
        this.setState({ user });
    };

    onSubmit = (event) => {
        event.preventDefault();

        const token = this.props.params.token;
        const { user } = this.state;
        const { password, confirmPassword } = user;

        if (password.length < MINIMUM_PASSWORD_LENGTH) {
            NotificationActions.error({ message: MINIMUM_PASSWORD_MESSAGE });
        } else if (password !== confirmPassword) {
            NotificationActions.error({ message: MATCHING_PASSWORD_MESSAGE });
        } else {
            SignUpActions.update({ id: token, user });
        }
    };

    render() {
        const { user } = this.state;
        const { loading, saving, user: loadedUser } = this.props;

        const mergedUser = Object.assign({}, loadedUser, user);

        return (
            <SignUpForm
                user={mergedUser}
                loading={loading}
                saving={saving}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
        );
    }
}
