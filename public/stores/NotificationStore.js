import alt from '../helpers/alt';
import NotificationActions from '../actions/NotificationActions';

class NotificationStore {
    constructor() {
        this.bindActions(NotificationActions);

        this.state = {
            notification: null,
        };
    }

    addNotification(notification) {
        this.setState({ notification });
    }
}

export default alt.createStore(NotificationStore, 'NotificationStore');
