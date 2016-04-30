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
        const savedJwt = localStorage.getItem('jwt');
        let redirect = false;

        if (savedJwt !== jwt) {
            localStorage.setItem('jwt', jwt);
            redirect = true;
        }

        NotificationActions.success({ message: 'Logged in' });

        return { jwt, redirect };
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
