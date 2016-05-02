import alt from '../helpers/alt';
import passwordActions from '../actions/PasswordActions';

class PasswordStore {
    constructor() {
        this.bindActions(passwordActions);

        this.result = null;
        this.error = null;
        this.saving = false;
    }

    update() {
        this.saving = true;
    }

    updateSuccess(result) {
        this.result = result;
        this.saving = false;
    }

    updateError(error) {
        this.error = error;
        this.saving = false;
    }
}

export default alt.createStore(PasswordStore, 'PasswordStore');
