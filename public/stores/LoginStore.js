import alt from '../helpers/alt';
import jwtDecode from 'jwt-decode';
import loginActions from '../actions/LoginActions';
import history from '../helpers/history';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../constants/routeConstants';

class LoginStore {
    constructor() {
        this.bindActions(loginActions);

        this.errorMessage = null;
        this.saving = false;
        this.user = null;
        this.jwt = null;
    }

    login() {
        this.saving = true;
    }

    loginSuccess({ jwt, redirect }) {
        this.jwt = jwt;
        this.user = jwtDecode(jwt);
        this.isLoggedIn = true;
        this.saving = true;

        if (redirect) {
            history.replace(ADMIN_ROUTE);
        }
    }

    loginError(errorMessage) {
        this.errorMessage = errorMessage;
        this.saving = false;
    }

    logoutUser() {
        this.jwt = null;
        this.user = null;
        this.isLoggedIn = false;
        history.replace(LOGIN_ROUTE);
    }
}

export default alt.createStore(LoginStore, 'LoginStore');
