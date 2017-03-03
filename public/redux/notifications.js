/* @flow */

import { createAction } from 'redux-actions';
import uuid from 'uuid';

const SUCCESS_NOTIFICATION = 'our-wedding-heroes/notifications/SUCCESS_NOTIFICATION';
const ERROR_NOTIFICATION = 'our-wedding-heroes/notifications/ERROR_NOTIFICATION';
const HIDE_NOTIFICATION = 'our-wedding-heroes/notifications/HIDE_NOTIFICATION';

type StateType = Array<{ id: string, message: string, position: 'bl', show: boolean, level: 'success' | 'error' }>;
type ActionType = Object;

function createNotification(notification) {
    return { ...notification, id: uuid.v4(), position: 'bl', show: true };
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

export default function reducer(state: StateType = [], action: ActionType) {
    if (action.type === HIDE_NOTIFICATION) {
        return state.map((notification) => {
            if (action.payload.id !== notification.id) {
                return notification;
            }

            return { ...notification, show: false };
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

export const success = createAction(SUCCESS_NOTIFICATION);
export const error = createAction(ERROR_NOTIFICATION);
export const hideNotification = createAction(HIDE_NOTIFICATION);
