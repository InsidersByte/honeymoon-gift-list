import alt from '../helpers/alt';
import SetupActions from '../actions/SetupActions';

class SetupStore {
    constructor() {
        this.bindActions(SetupActions);

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
}

export default alt.createStore(SetupStore, 'SetupStore');
