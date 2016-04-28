import alt from '../helpers/alt';
import userApi from '../api/UserApi';

class PasswordResetActions {
    update(user) {
        return (dispatch) => {
            dispatch();

            userApi
                .passwordPut(user)
                .then(this.updateSuccess)
                .catch(this.updateError);
        };
    }

    updateSuccess = o => o;

    updateError = o => o;
}

export default alt.createActions(PasswordResetActions);
