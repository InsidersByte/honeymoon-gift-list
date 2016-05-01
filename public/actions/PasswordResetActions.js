import alt from '../helpers/alt';
import authenticateApi from '../api/AuthenticateApi';
import NotificationActions from './NotificationActions';

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

    createSuccess(response) {
        NotificationActions.success({ message: 'Please check your email for instructions' });
        return response;
    }

    createError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    }

    update(data) {
        return (dispatch) => {
            dispatch();

            authenticateApi
                .resetPasswordPut(data)
                .then(this.updateSuccess)
                .catch(this.updateError);
        };
    }

    updateSuccess(response) {
        NotificationActions.success({ message: 'Password Reset Successfully' });
        return response;
    }

    updateError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    }
}

export default alt.createActions(PasswordResetActions);
