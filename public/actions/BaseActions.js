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

    fetchError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    }

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

    queryError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    }

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

    createSuccess(response) {
        NotificationActions.success({ message: 'Created Successfully!' });
        return response;
    };

    createError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    };

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

    updateSuccess(response) {
        NotificationActions.success({ message: 'Updated Successfully!' });
        return response;
    }

    updateError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    }

    remove({ _id }) {
        return (dispatch) => {
            dispatch();

            this.api
                .delete(_id)
                .then(this.removeSuccess)
                .catch(this.removeError);
        };
    }

    removeSuccess(response) {
        NotificationActions.success({ message: 'Deleted Successfully!' });
        return response;
    }

    removeError = error => {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    };

    reset() {
        return (dispatch) => {
            dispatch();
        };
    }
}
