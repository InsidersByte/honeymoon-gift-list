import * as TYPES from '../constants/actionTypes';

const setup = {
    saving: false,
};

export default function usersReducer(state = setup, action) {
    switch (action.type) {
        case TYPES.SETUP_REQUEST:
            return Object.assign({}, state, { saving: true });

        case TYPES.SETUP_SUCCESS:
            return Object.assign({}, state, { saving: false });

        case TYPES.SETUP_ERROR:
            return Object.assign({}, state, { saving: false });

        default:
            return state;
    }
}
