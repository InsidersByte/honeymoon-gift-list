class BaseStore {
    constructor({ actions, key }) {
        this.bindActions(actions);

        this.key = key;

        this[key] = '';
        this.errorMessage = null;
        this.loading = false;
        this.saving = false;
    }

    fetch() {
        this[this.key] = '';
        this.loading = true;
    }

    fetchSuccess(data) {
        this[this.key] = data;
        this.errorMessage = null;
        this.loading = false;
    }

    fetchError(errorMessage) {
        this.errorMessage = errorMessage;
        this.loading = false;
    }

    update() {
        this.saving = true;
    }

    updateSuccess(data) {
        this[this.key] = data;
        this.errorMessage = null;
        this.saving = false;
    }

    updateError(errorMessage) {
        this.errorMessage = errorMessage;
        this.saving = false;
    }
}

export default BaseStore;
