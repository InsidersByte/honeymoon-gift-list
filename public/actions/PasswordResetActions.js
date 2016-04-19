import alt from '../helpers/alt';
import authenticateApi from '../api/authenticate.api';

class PasswordResetActions {
    create(user) {
        return (dispatch) => {
            dispatch();

            authenticateApi
                .resetPasswordPost(user)
                .then(this.createSuccess)
                .catch(this.createError);
        };
    }

    createSuccess = o => o;

    createError = o => o;

    update(data) {
        return (dispatch) => {
            dispatch();

            authenticateApi
                .resetPasswordPut(data)
                .then(this.updateSuccess)
                .catch(this.updateError);
        };
    }

    updateSuccess = o => o;

    updateError = o => o;
}

export default alt.createActions(PasswordResetActions);
