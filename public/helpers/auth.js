import authenticateApi from '../api/AuthenticateApi';
import loginActions from '../actions/LoginActions';

class Auth {
    login(user) {
        // We call the server to log the user in.
        return authenticateApi
            .post(user)
            .then((response) => {
                const jwt = response.token;

                loginActions.loginUser(jwt);

                return true;
            });
    }

    logout() {
        loginActions.logoutUser();
    }
}

export default new Auth();
