import alt from '../helpers/alt';
import authenticateApi from '../api/authenticate.api';

class AuthenticateActions {
    resetPassword(user) {
        return (dispatch) => {
            dispatch();

            authenticateApi
                .resetPassword(user)
                .then(this.fetchSuccess)
                .catch(this.fetchError);
        };
    }

    resetPasswordSuccess = o => o;

    resetPasswordError = o => o;
}

export default alt.createActions(AuthenticateActions);
