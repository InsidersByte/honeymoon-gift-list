import * as TYPES from '../constants/actionTypes';
import jwtDecoder from '../utils/jwtDecoder';

const auth = {
  user: {},
  isAuthenticated: false,
  saving: false,
};

export default function authReducer(state = auth, action) {
  switch (action.type) {
    case TYPES.LOGIN_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.LOGIN_SUCCESS: {
      const { token } = action.payload;
      const user = jwtDecoder(token);

      return Object.assign({}, state, { user, isAuthenticated: true, saving: false });
    }

    case TYPES.LOGIN_ERROR:
      return Object.assign({}, state, { saving: false });

    case TYPES.LOGOUT:
      return Object.assign({}, state, { user: {}, isAuthenticated: false, saving: false });

    case TYPES.REQUEST_PASSWORD_RESET_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.REQUEST_PASSWORD_RESET_SUCCESS:
      return Object.assign({}, state, { saving: false });

    case TYPES.REQUEST_PASSWORD_RESET_ERROR:
      return Object.assign({}, state, { saving: false });

    case TYPES.PASSWORD_RESET_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.PASSWORD_RESET_SUCCESS:
      return Object.assign({}, state, { saving: false });

    case TYPES.PASSWORD_RESET_ERROR:
      return Object.assign({}, state, { saving: false });

    default:
      return state;
  }
}
