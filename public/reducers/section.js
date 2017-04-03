import * as TYPES from '../constants/actionTypes';

const section = {
  loading: false,
  saving: false,
  section: {
    title: '',
    content: '',
    hidden: false,
  },
};

export default function weddingPartyMemberReducer(state = section, action) {
  switch (action.type) {
    case TYPES.CREATE_SECTION_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.CREATE_SECTION_SUCCESS:
      return Object.assign({}, state, { saving: false });

    case TYPES.CREATE_SECTION_ERROR:
      return Object.assign({}, state, { saving: false });

    case TYPES.LOAD_SECTION_REQUEST:
      return Object.assign({}, state, { loading: true });

    case TYPES.LOAD_SECTION_SUCCESS:
      return Object.assign({}, state, { section: action.payload, loading: false });

    case TYPES.LOAD_SECTION_ERROR:
      return Object.assign({}, state, { loading: false });

    case TYPES.UPDATE_SECTION_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.UPDATE_SECTION_SUCCESS:
      return Object.assign({}, state, { section: action.payload, saving: false });

    case TYPES.UPDATE_SECTION_ERROR:
      return Object.assign({}, state, { saving: false });

    default:
      return state;
  }
}
