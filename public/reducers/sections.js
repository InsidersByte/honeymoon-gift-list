import * as TYPES from '../constants/actionTypes';
import { move } from '../utils/sortingHelper';

const initialSections = {
  loading: false,
  sections: [],
};

function moveSections({ sections }, { payload: { sourceId, targetId } }) {
  return move({ sourceId, targetId, data: sections });
}

export default function sectionsReducer(state = initialSections, action) {
  switch (action.type) {
    case TYPES.LOAD_SECTIONS_REQUEST:
      return Object.assign({}, state, { loading: true });

    case TYPES.LOAD_SECTIONS_SUCCESS:
      return Object.assign({}, state, { sections: action.payload, loading: false });

    case TYPES.LOAD_SECTIONS_ERROR:
      return Object.assign({}, state, { loading: false });

    case TYPES.DELETE_SECTION_REQUEST:
      return Object.assign({}, state, { deleting: true });

    case TYPES.DELETE_SECTION_SUCCESS:
      return Object.assign({}, state, { deleting: false });

    case TYPES.DELETE_SECTION_ERROR:
      return Object.assign({}, state, { deleting: false });

    case TYPES.MOVE_SECTION:
      return Object.assign({}, state, { sections: moveSections(state, action) });

    default:
      return state;
  }
}
