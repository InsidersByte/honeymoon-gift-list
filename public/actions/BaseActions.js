class BaseActions {
    constructor({ api, key }) {
        this.api = api;
        this.key = key;
    }

    fetch() {
        return (dispatch) => {
            dispatch();

            this.api
                .get()
                .then(this.fetchSuccess)
                .catch(this.fetchError);
        };
    }

    fetchSuccess = o => o;

    fetchError = o => o;

    create({ [this.key]: data }) {
        return (dispatch) => {
            dispatch();

            this.api
                .post({ ...data })
                .then(this.createSuccess)
                .catch(this.createError);
        };
    }

    createSuccess = o => o;

    createError = o => o;

    update({ [this.key]: data }) {
        return (dispatch) => {
            dispatch();

            this.api
                .put({ ...data })
                .then(this.updateSuccess)
                .catch(this.updateError);
        };
    }

    updateSuccess = o => o;

    updateError = o => o;
}

export default BaseActions;
