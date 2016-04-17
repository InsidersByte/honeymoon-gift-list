import alt from '../helpers/alt';
import authenticateActions from '../actions/AuthenticateActions';

class AuthenticateStore {
    constructor() {
        this.bindActions(authenticateActions);

        this.result = null;
        this.error = null;
        this.isSaving = false;
    }

    resetPassword() {
        this.isSaving = true;
    }

    resetPasswordSuccess(result) {
        this.result = result;
        this.isSaving = false;
    }

    resetPasswordError(error) {
        this.error = error;
        this.isSaving = false;
    }
}

export default alt.createStore(AuthenticateStore, 'AuthenticateStore');
