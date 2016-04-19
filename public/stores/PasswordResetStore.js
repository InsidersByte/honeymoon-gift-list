import alt from '../helpers/alt';
import authenticateActions from '../actions/PasswordResetActions';

class PasswordResetStore {
    constructor() {
        this.bindActions(authenticateActions);

        this.result = null;
        this.error = null;
        this.isSaving = false;
    }

    create() {
        this.isSaving = true;
    }

    createSuccess(result) {
        this.result = result;
        this.isSaving = false;
    }

    createError(error) {
        this.error = error;
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
