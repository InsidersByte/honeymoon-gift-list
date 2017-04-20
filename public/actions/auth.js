import { browserHistory } from 'react-router-dom';
import { CALL_API } from '../middleware/api';
import { success } from '../redux/notifications';
import * as TYPES from '../constants/actionTypes';
import { TOKEN } from '../constants';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../constants/routes';
import { HTTP_METHODS } from '../constants/api';
import { setItem, removeItem } from '../utils/localStorage';

export function login({ email, password }) {
  return {
    [CALL_API]: {
      data: { email, password },
      endpoint: 'authenticate',
      method: HTTP_METHODS.POST,
      afterSuccess: (dispatch, { token }) => {
        setItem(TOKEN, token);
        dispatch(success({ message: 'Successfully logged in' }));
        browserHistory.push(ADMIN_ROUTE);
      },
      types: [TYPES.LOGIN_REQUEST, TYPES.LOGIN_SUCCESS, TYPES.LOGIN_ERROR],
    },
  };
}

export function logout() {
  return dispatch => {
    removeItem(TOKEN);
    dispatch({ type: TYPES.LOGOUT });
    dispatch(success({ message: 'Successfully logged out' }));
    browserHistory.push(LOGIN_ROUTE);
  };
}

export function requestPasswordReset(data) {
  return {
    [CALL_API]: {
      data,
      endpoint: 'authenticate/resetPassword',
      method: HTTP_METHODS.POST,
      onSuccess: dispatch => {
        dispatch(
          success({
            message: 'Please check your email for instructions',
          })
        );
      },
      types: [TYPES.REQUEST_PASSWORD_RESET_REQUEST, TYPES.REQUEST_PASSWORD_RESET_SUCCESS, TYPES.REQUEST_PASSWORD_RESET_ERROR],
    },
  };
}

export function resetPassword(data) {
  return {
    [CALL_API]: {
      data,
      endpoint: `authenticate/resetPassword/${data.token}`,
      method: HTTP_METHODS.PUT,
      onSuccess: dispatch => {
        dispatch(success({ message: 'Password reset successfully' }));
        browserHistory.push(LOGIN_ROUTE);
      },
      types: [TYPES.PASSWORD_RESET_REQUEST, TYPES.PASSWORD_RESET_SUCCESS, TYPES.PASSWORD_RESET_ERROR],
    },
  };
}
