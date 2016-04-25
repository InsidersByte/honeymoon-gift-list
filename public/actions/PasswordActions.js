import alt from '../helpers/alt';
import authenticateApi from '../api/authenticate.api';

class PasswordResetActions {
    update(user) {
        return (dispatch) => {
            dispatch();

            authenticateApi
                .passwordPut(user)
                .then(this.updateSuccess)
                .catch(this.updateError);
        };
    }

    updateSuccess = o => o;

    updateError = o => o;
}

export default alt.createActions(PasswordResetActions);
