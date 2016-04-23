class BaseStore {
    constructor({ actions, key, initialValue = '' }) {
        this.bindActions(actions);

        this.key = key;
        this.initialValue = initialValue;

        this[key] = initialValue;
        this[`${key}s`] = [];
        this.errorMessage = null;
        this.loading = false;
        this.saving = false;
        this.removing = false;
    }

    fetch() {
        this.reset();
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

    query() {
        this[`${this.key}s`] = [];
        this.loading = true;
    }

    querySuccess(data) {
        this[`${this.key}s`] = data;
        this.errorMessage = null;
        this.loading = false;
    }

    queryError(errorMessage) {
        this.errorMessage = errorMessage;
        this.loading = false;
    }

    create() {
        this.saving = true;
    }

    createSuccess(data) {
        this[this.key] = data;
        this.errorMessage = null;
        this.saving = false;
    }

    createError(errorMessage) {
        this.errorMessage = errorMessage;
        this.saving = false;
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

    remove() {
        this.removing = true;
    }

    removeSuccess() {
        this.errorMessage = null;
        this.removing = false;
    }

    removeError(errorMessage) {
        this.errorMessage = errorMessage;
        this.removing = false;
    }

    reset() {
        this[this.key] = typeof this.initialValue === 'string' ? this.initialValue : Object.assign({}, this.initialValue);
        this[`${this.key}s`] = [];
    }
}

export default BaseStore;
