import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/GiftSetApi';
import { GIFT_SET as key } from '../constants/KeyConstants';
import NotificationActions from './NotificationActions';

class GiftSetActions extends BaseActions {
    constructor() {
        super({ api, key });
    }

    detailsSent({ giftSet, id }) {
        return (dispatch) => {
            dispatch();

            this.api
                .detailsSent(giftSet, id)
                .then(this.detailsSentSuccess)
                .catch(this.detailsSentError);
        };
    }

    detailsSentSuccess(response) {
        NotificationActions.success({ message: 'Gift set marked as details sent' });
        return response;
    }

    detailsSentError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    }

    paid({ giftSet, id }) {
        return (dispatch) => {
            dispatch();

            this.api
                .paid(giftSet, id)
                .then(this.paidSuccess)
                .catch(this.paidError);
        };
    }

    paidSuccess(response) {
        NotificationActions.success({ message: 'Gift set marked as paid' });
        return response;
    }

    paidError(error) {
        console.error(error);
        NotificationActions.error({ message: 'An Error Occurred' });
        return error;
    }
}

export default alt.createActions(GiftSetActions);
