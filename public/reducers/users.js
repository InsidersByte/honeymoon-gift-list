import * as TYPES from '../constants/actionTypes';

const users = {
  loading: false,
  saving: false,
  deleting: false,
  userModalOpen: false,
  users: [],
};

export default function usersReducer(state = users, action) {
  switch (action.type) {
    case TYPES.OPEN_USER_MODAL:
      return Object.assign({}, state, { userModalOpen: true });

    case TYPES.CLOSE_USER_MODAL:
      return Object.assign({}, state, { userModalOpen: false });

    case TYPES.LOAD_USERS_REQUEST:
      return Object.assign({}, state, { loading: true });

    case TYPES.LOAD_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.payload, loading: false });

    case TYPES.LOAD_USERS_ERROR:
      return Object.assign({}, state, { loading: false });

    case TYPES.CREATE_USER_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.CREATE_USER_SUCCESS:
      return Object.assign({}, state, { saving: false });

    case TYPES.CREATE_USER_ERROR:
      return Object.assign({}, state, { saving: false });

    case TYPES.DELETE_USER_REQUEST:
      return Object.assign({}, state, { deleting: true });

    case TYPES.DELETE_USER_SUCCESS:
      return Object.assign({}, state, { deleting: true });

    case TYPES.DELETE_USER_ERROR:
      return Object.assign({}, state, { deleting: true });

    default:
      return state;
  }
}
