import alt from '../helpers/alt';

class NotificationActions {
    addNotification(notification) {
        const newNotification = { position: 'bl', ...notification };
        return newNotification;
    }

    success(notification) {
        const successNotification = { ...notification, level: 'success' };
        this.addNotification(successNotification);
    }

    error(notification) {
        const errorNotification = { ...notification, level: 'error' };
        this.addNotification(errorNotification);
    }

    warning(notification) {
        const warningNotification = { ...notification, level: 'warning' };
        this.addNotification(warningNotification);
    }

    info(notification) {
        const infoNotification = { ...notification, level: 'info' };
        this.addNotification(infoNotification);
    }
}

export default alt.createActions(NotificationActions);
