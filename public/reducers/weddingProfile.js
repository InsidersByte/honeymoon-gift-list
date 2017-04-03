import * as TYPES from '../constants/actionTypes';

const weddingProfile = {
  loading: false,
  saving: false,
  weddingProfile: {
    coverTitle: '',
    coverImageUrl: '',
    weddingDate: null,
    giftListContent: '',
    showPaymentMessage: false,
    paymentMessage: '',
    showDisclaimerMessage: false,
    disclaimerMessage: '',
  },
};

export default function weddingProfileReducer(state = weddingProfile, action) {
  switch (action.type) {
    case TYPES.LOAD_WEDDING_PROFILE_REQUEST:
      return Object.assign({}, state, { loading: true });

    case TYPES.LOAD_WEDDING_PROFILE_SUCCESS:
      return Object.assign({}, state, { weddingProfile: action.payload, loading: false });

    case TYPES.LOAD_WEDDING_PROFILE_ERROR:
      return Object.assign({}, state, { loading: false });

    case TYPES.UPDATE_WEDDING_PROFILE_REQUEST:
      return Object.assign({}, state, { saving: true });

    case TYPES.UPDATE_WEDDING_PROFILE_SUCCESS:
      return Object.assign({}, state, { weddingProfile: action.payload, saving: false });

    case TYPES.UPDATE_WEDDING_PROFILE_ERROR:
      return Object.assign({}, state, { saving: false });

    default:
      return state;
  }
}
