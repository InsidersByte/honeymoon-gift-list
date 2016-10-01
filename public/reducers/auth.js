import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../constants/actionTypes';
import jwtDecoder from '../utils/jwtDecoder';

const auth = {
    user: {},
    isAuthenticated: false,
    saving: false,
};

export default function authReducer(state = auth, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, { saving: true });

        case LOGIN_SUCCESS: {
            const { token } = action.payload;
            const user = jwtDecoder(token);

            return Object.assign({}, state, { user, isAuthenticated: true, saving: false });
        }

        case LOGIN_ERROR:
            return Object.assign({}, state, { saving: false });

        case LOGOUT:
            return Object.assign({}, state, { user: {}, isAuthenticated: false, saving: false });

        default:
            return state;
    }
}
