import * as TYPES from '../constants/actionTypes';

const signUp = {
  loading: false,
  saving: false,
  user: {
    email: '',
  },
};

export default function usersReducer(state = signUp, action) {
  switch (action.type) {
    case TYPES.LOAD_SIGN_UP_REQUEST:
      return Object.assign({}, state, { loading: true });

    case TYPES.LOAD_SIGN_UP_SUCCESS:
      return Object.assign({}, state, { user: action.payload, loading: false });

    case TYPES.LOAD_SIGN_UP_ERROR:
      return Object.assign({}, state, { loading: false });

    case TYPES.SIGN_UP_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.SIGN_UP_SUCCESS:
      return Object.assign({}, state, { saving: false });

    case TYPES.SIGN_UP_ERROR:
      return Object.assign({}, state, { saving: false });

    default:
      return state;
  }
}
