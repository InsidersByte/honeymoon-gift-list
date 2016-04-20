import alt from '../helpers/alt';
import jwtDecode from 'jwt-decode';
import loginActions from '../actions/LoginActions';
import history from '../helpers/history';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../constants/routes.constants';

class LoginStore {
    constructor() {
        this.bindActions(loginActions);

        this.user = null;
        this.jwt = null;
    }

    loginUser({ jwt, redirect }) {
        this.jwt = jwt;
        this.user = jwtDecode(jwt);
        this.isLoggedIn = true;

        if (redirect) {
            history.replace(ADMIN_ROUTE);
        }
    }

    logoutUser() {
        this.jwt = null;
        this.user = null;
        this.isLoggedIn = false;
        history.replace(LOGIN_ROUTE);
    }
}

export default alt.createStore(LoginStore, 'LoginStore');
