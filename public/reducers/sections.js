import * as TYPES from '../constants/actionTypes';

const sections = {
    loading: false,
    sections: [],
};

export default function sectionsReducer(state = sections, action) {
    switch (action.type) {
        case TYPES.LOAD_SECTIONS_REQUEST:
            return Object.assign({}, state, { loading: true });

        case TYPES.LOAD_SECTIONS_SUCCESS:
            return Object.assign({}, state, { sections: action.payload, loading: false });

        case TYPES.LOAD_SECTIONS_ERROR:
            return Object.assign({}, state, { loading: false });

        default:
            return state;
    }
}
