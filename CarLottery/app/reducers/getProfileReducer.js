import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
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

    default:
      return state;
  }
}

export default getProfileDataReducer;
