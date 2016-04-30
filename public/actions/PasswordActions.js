import alt from '../helpers/alt';
import userApi from '../api/UserApi';
import NotificationActions from './NotificationActions';

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

    updateError = error => {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    };
}

export default alt.createActions(PasswordResetActions);
