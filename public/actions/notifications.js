import { createAction } from 'redux-actions';
import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION, HIDE_NOTIFICATION } from '../constants/actionTypes';

export const success = createAction(SUCCESS_NOTIFICATION);
export const error = createAction(ERROR_NOTIFICATION);
export const hideNotification = createAction(HIDE_NOTIFICATION);
