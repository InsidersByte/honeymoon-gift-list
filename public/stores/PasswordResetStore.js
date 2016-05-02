import alt from '../helpers/alt';
import passwordResetActions from '../actions/PasswordResetActions';
import history from '../helpers/history';
import { LOGIN_ROUTE } from '../constants/routeConstants';

class PasswordResetStore {
    constructor() {
        this.bindActions(passwordResetActions);

        this.result = null;
        this.error = null;
        this.saving = false;
    }

    create() {
        this.saving = true;
    }

    createSuccess(result) {
        this.result = result;
        this.saving = false;
    }

    createError(error) {
        this.error = error;
        this.saving = false;
    }

    update() {
        this.saving = true;
    }

    updateSuccess(result) {
        this.result = result;
        this.saving = false;
        history.replace(LOGIN_ROUTE);
    }

    updateError(error) {
        this.error = error;
        this.saving = false;
    }
}

export default alt.createStore(PasswordResetStore, 'PasswordResetStore');
