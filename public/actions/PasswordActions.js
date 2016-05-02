import alt from '../helpers/alt';
import userApi from '../api/UserApi';
import NotificationActions from './NotificationActions';

class PasswordResetActions {
    update(user) {
        return (dispatch) => {
            dispatch();

            userApi
                .passwordPut(user)
                .then(o => {
                    setTimeout(() => {
                        this.updateSuccess(o);
                    }, 2000);
                })
                .catch(this.updateError);
        };
    }

    updateSuccess(response) {
        NotificationActions.success({ message: 'Password Changed' });
        return response;
    }

    updateError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    }
}

export default alt.createActions(PasswordResetActions);
