/* @flow */

import uuid from 'uuid';
import type { NotificationType, NotificationsType, ActionType, NotificationLevelType } from '../types';

const SUCCESS_NOTIFICATION = 'our-wedding-heroes/notifications/SUCCESS_NOTIFICATION';
const ERROR_NOTIFICATION = 'our-wedding-heroes/notifications/ERROR_NOTIFICATION';
const HIDE_NOTIFICATION = 'our-wedding-heroes/notifications/HIDE_NOTIFICATION';

const createNotification = ({ message, level }: { +message: string, +level: NotificationLevelType }): NotificationType => ({
  message,
  level,
  id: uuid.v4(),
  position: 'bl',
  show: true,
});

const createSuccessNotification = ({ payload: { message } }): NotificationType => createNotification({ message, level: 'success' });

const createErrorNotification = (message: string): NotificationType => createNotification({ message, level: 'error' });

const createErrorNotifications = ({ payload }): NotificationType | Array<NotificationType> => {
  const notifications = [];

  if (payload.response && payload.response.body && (payload.response.body.message || payload.response.body.errors)) {
    if (payload.response.body.message) {
      // FIXME:FLOW Can't seem to get the types right for global errors
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
};

const reducer = (state: NotificationsType = [], action: ActionType): NotificationsType => {
  if (action.error && !action.suppressGlobalError) {
    // FIXME:FLOW Can't seem to get the types right for global errors
    return [...state, ...createErrorNotifications(action)];
  }

  switch (action.type) {
    case HIDE_NOTIFICATION: {
      const { payload } = action;
      const { id } = payload;

      return state.map(notification => {
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
};

export default reducer;

export const success = ({ message }: { message: string }): ActionType => ({
  type: SUCCESS_NOTIFICATION,
  payload: { message },
});

export const error = ({ message }: { message: string }): ActionType => ({
  type: ERROR_NOTIFICATION,
  payload: { message },
});

export const hideNotification = (notification: NotificationType): ActionType => ({
  type: HIDE_NOTIFICATION,
  payload: notification,
});
