import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  SET_USER_PROFILE_IMAGE,
} from '../actions/profileActions';

const initialState = {
  isLoading: false,
  profileResponse: {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    country: '',
    state: '',
    city: '',
    address: '',
    pincode: '',
    userProfileImage: '',
  },
};

function getProfileDataReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        profileResponse: {},
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profileResponse: action.data.user_profile,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        profileResponse: action.data,
      };
    case SET_USER_PROFILE_IMAGE:
      const imageUrl = action.url !== null ? action.url : '';
      return {
        ...state,
        userProfileImage: imageUrl,
      };
    default:
      return state;
  }
}

export default getProfileDataReducer;
