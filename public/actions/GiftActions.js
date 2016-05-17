import alt from '../helpers/alt';
import BasketActions from './BasketActions';
import NotificationActions from './NotificationActions';
import GiftApi from '../api/GiftApi';

class LoginActions {
    constructor() {
        this.generateActions('fetchSuccess');
    }

    fetch(id) {
        return (dispatch) => {
            dispatch();

            GiftApi
                .get(id)
                .then(this.fetchSuccess)
                .catch(this.fetchError);
        };
    }

    fetchError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    }

    create({ giver, items }) {
        return (dispatch) => {
            dispatch();

            GiftApi
                .post({ giver, items })
                .then(this.createSuccess)
                .catch(this.createError);
        };
    }

    createSuccess(response) {
        BasketActions.emptyBasket();
        return response;
    }

    createError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    }

    logoutUser() {
        return (dispatch) => {
            localStorage.removeItem('jwt');
            dispatch();
        };
    }
}

export default alt.createActions(LoginActions);
