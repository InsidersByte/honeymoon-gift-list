import * as TYPES from '../constants/actionTypes';

const weddingPartyMember = {
  loading: false,
  saving: false,
  weddingPartyMember: {
    name: '',
    title: '',
    imageUrl: '',
    description: '',
  },
};

export default function weddingPartyMemberReducer(state = weddingPartyMember, action) {
  switch (action.type) {
    case TYPES.CREATE_WEDDING_PARTY_MEMBER_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.CREATE_WEDDING_PARTY_MEMBER_SUCCESS:
      return Object.assign({}, state, { weddingPartyMember: action.payload, saving: false });

    case TYPES.CREATE_WEDDING_PARTY_MEMBER_ERROR:
      return Object.assign({}, state, { saving: false });

    case TYPES.LOAD_WEDDING_PARTY_MEMBER_REQUEST:
      return Object.assign({}, state, { loading: true });

    case TYPES.LOAD_WEDDING_PARTY_MEMBER_SUCCESS:
      return Object.assign({}, state, { weddingPartyMember: action.payload, loading: false });

    case TYPES.LOAD_WEDDING_PARTY_MEMBER_ERROR:
      return Object.assign({}, state, { loading: false });

    case TYPES.UPDATE_WEDDING_PARTY_MEMBER_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.UPDATE_WEDDING_PARTY_MEMBER_SUCCESS:
      return Object.assign({}, state, { weddingPartyMember: action.payload, saving: false });

    case TYPES.UPDATE_WEDDING_PARTY_MEMBER_ERROR:
      return Object.assign({}, state, { saving: false });

    default:
      return state;
  }
}
