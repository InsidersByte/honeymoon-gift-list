import alt from '../helpers/alt';
import NotificationActions from './NotificationActions';
import AuthenticateApi from '../api/AuthenticateApi';

class LoginActions {
    login({ user }) {
        return (dispatch) => {
            dispatch();

            AuthenticateApi
                .post(user)
                .then(this.loginSuccess)
                .catch(this.loginError);
        };
    }

    loginSuccess({ token: jwt }) {
        NotificationActions.success({ message: 'Logged in' });
        localStorage.setItem('jwt', jwt);
        return jwt;
    }

    loginError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    }

    logoutUser() {
        return (dispatch) => {
            localStorage.removeItem('jwt');
            dispatch();
        };
    }
}

export default alt.createActions(LoginActions);
