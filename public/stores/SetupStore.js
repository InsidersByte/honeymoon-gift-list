import alt from '../helpers/alt';
import SetupActions from '../actions/SetupActions';

class SetupStore {
    constructor() {
        this.bindActions(SetupActions);

        this.result = null;
        this.error = null;
        this.loading = false;
        this.saving = false;
        this.setup = null;
        this.errorMessage = null;
    }

    fetch() {
        this.setup = null;
        this.loading = true;
    }

    fetchSuccess(setup) {
        this.setup = setup;
        this.errorMessage = null;
        this.loading = false;
    }

    fetchError(errorMessage) {
        this.errorMessage = errorMessage;
        this.loading = false;
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
