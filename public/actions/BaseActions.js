import NotificationActions from './NotificationActions';

export default class BaseActions {
    constructor({ api, key }) {
        this.api = api;
        this.key = key;
    }

    fetch(id) {
        return (dispatch) => {
            dispatch();

            this.api
                .get(id)
                .then(this.fetchSuccess)
                .catch(this.fetchError);
        };
    }

    fetchSuccess = o => o;

    fetchError = o => o;

    query() {
        return (dispatch) => {
            dispatch();

            this.api
                .get()
                .then(this.querySuccess)
                .catch(this.queryError);
        };
    }

    querySuccess = o => o;

    queryError = o => o;

    create({ [this.key]: rawData }) {
        return (dispatch) => {
            dispatch();

            const data = typeof rawData === 'string' ? { [this.key]: rawData } : { ...rawData };

            this.api
                .post({ ...data })
                .then(this.createSuccess)
                .catch(this.createError);
        };
    }

    createSuccess = o => o;

    createError = o => o;

    update({ [this.key]: rawData, id }) {
        return (dispatch) => {
            dispatch();

            const data = typeof rawData === 'string' ? { [this.key]: rawData } : { ...rawData };

            this.api
                .put(data, id)
                .then(this.updateSuccess)
                .catch(this.updateError);
        };
    }

    updateSuccess = o => {
        NotificationActions.success({ message: 'Saved Successfully!' });
        return o;
    };

    updateError = o => o;

    remove({ _id }) {
        return (dispatch) => {
            dispatch();

            this.api
                .delete(_id)
                .then(this.removeSuccess)
                .catch(this.removeError);
        };
    }

    removeSuccess = o => o;

    removeError = o => o;

    reset() {
        return (dispatch) => {
            dispatch();
        };
    }
}
