import uuid from 'uuid';
import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION, HIDE_NOTIFICATION } from '../constants/actionTypes';

function createNotification(notification) {
    return { ...notification, id: uuid.v4(), position: 'br', show: true };
}

function createSuccessNotification({ payload: { message } }) {
    return createNotification({ message, level: 'success' });
}

function createErrorNotification(message) {
    return createNotification({ message, level: 'error' });
}

function createErrorNotifications({ payload }) {
    const notifications = [];

    if (payload.response && payload.response.body && (payload.response.body.message || payload.response.body.errors)) {
        if (payload.response.body.message) {
            notifications.push(createErrorNotification(payload.response.body.message));
        } else {
            notifications.push(...payload.response.body.errors.map(({ message }) => createErrorNotification(message)));
        }
    } else {
        notifications.push(createErrorNotification(payload.message));
    }

    return notifications;
}

export default function notificationReducer(state = [], action) {
    if (action.type === HIDE_NOTIFICATION) {
        return state.map((o) => {
            if (action.payload.id !== o.id) {
                return o;
            }

            return Object.assign({}, o, { show: false });
        });
    }

    if (action.error && !action.suppressGlobalError) {
        return [...state, ...createErrorNotifications(action)];
    }

    if (action.type === SUCCESS_NOTIFICATION) {
        return [...state, createSuccessNotification(action)];
    }

    if (action.type === ERROR_NOTIFICATION) {
        return [...state, createErrorNotification(action.payload.message)];
    }

    return state;
}
