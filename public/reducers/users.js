import { LOAD_USERS_REQUEST, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from '../constants/actionTypes';

const users = {
    loading: true,
    users: [],
};

export default function usersReducer(state = users, action) {
    switch (action.type) {
        case LOAD_USERS_REQUEST:
            return Object.assign({}, state, { loading: true });

        case LOAD_USERS_SUCCESS:
            return Object.assign({}, { users: action.payload }, { loading: false });

        case LOAD_USERS_ERROR:
            return Object.assign({}, state, { loading: false });

        default:
            return state;
    }
}
