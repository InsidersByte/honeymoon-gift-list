import alt from '../helpers/alt';
import passwordActions from '../actions/PasswordActions';

class PasswordResetStore {
    constructor() {
        this.bindActions(passwordActions);

        this.result = null;
        this.error = null;
        this.isSaving = false;
    }

    update() {
        this.isSaving = true;
    }

    updateSuccess(result) {
        this.result = result;
        this.isSaving = false;
    }

    updateError(error) {
        this.error = error;
        this.isSaving = false;
    }
}

export default alt.createStore(PasswordResetStore, 'PasswordResetStore');
