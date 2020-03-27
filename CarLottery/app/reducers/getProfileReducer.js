import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  SET_USER_PROFILE_IMAGE,
} from '../actions/profileActions';
import { userProfileImgUrl } from '../api/urls';

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
        userProfileImage: action.data.user_profile && (action.data.user_profile.image ? userProfileImgUrl(action.data.user_profile.image) : ''),
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
