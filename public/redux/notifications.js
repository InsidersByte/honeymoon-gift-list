/* @flow */

import { createAction } from 'redux-actions';
import uuid from 'uuid';
import type { NotificationType, NotificationsType, ActionType } from '../types';

const SUCCESS_NOTIFICATION = 'our-wedding-heroes/notifications/SUCCESS_NOTIFICATION';
const ERROR_NOTIFICATION = 'our-wedding-heroes/notifications/ERROR_NOTIFICATION';
const HIDE_NOTIFICATION = 'our-wedding-heroes/notifications/HIDE_NOTIFICATION';

function createNotification({ message, level }): NotificationType {
    // FIXME:FLOW Can't seem to get the types right for global errors
    return { message, level, id: uuid.v4(), position: 'bl', show: true };
}

function createSuccessNotification({ payload: { message } }): NotificationType {
    return createNotification({ message, level: 'success' });
}

function createErrorNotification(message): NotificationType {
    return createNotification({ message, level: 'error' });
}

function createErrorNotifications({ payload }) {
    const notifications = [];

    if (payload.response && payload.response.body && (payload.response.body.message || payload.response.body.errors)) {
        if (payload.response.body.message) {
            notifications.push(createErrorNotification(payload.response.body.message));
        } else {
            // FIXME:FLOW Can't seem to get the types right for global errors
            notifications.push(...payload.response.body.errors.map(({ message }) => createErrorNotification(message)));
        }
    } else {
        // FIXME:FLOW Can't seem to get the types right for global errors
        notifications.push(createErrorNotification(payload.message));
    }

    return notifications;
}
export default function reducer(state: NotificationsType = [], action: ActionType): NotificationsType {
    if (action.error && !action.suppressGlobalError) {
        // FIXME:FLOW Can't seem to get the types right for global errors
        return [...state, ...createErrorNotifications(action)];
    }

    switch (action.type) {
        case HIDE_NOTIFICATION: {
            const { payload } = action;
            const { id } = payload;

            return state.map((notification) => {
                if (id !== notification.id) {
                    return notification;
                }

                return { ...notification, show: false };
            });
        }

        case SUCCESS_NOTIFICATION:
            return [...state, createSuccessNotification(action)];

        case ERROR_NOTIFICATION:
            return [...state, createErrorNotification(action.payload.message)];

        default:
            return state;
    }
}

export const success = createAction(SUCCESS_NOTIFICATION);
export const error = createAction(ERROR_NOTIFICATION);
export const hideNotification = createAction(HIDE_NOTIFICATION);
