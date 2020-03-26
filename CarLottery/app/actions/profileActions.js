/**
 * API to get the country list
 */

export const GET_COUNTRY_REQUEST = 'GET_COUNTRY_REQUEST';
export const GET_COUNTRY_SUCCESS = 'GET_COUNTRY_SUCCESS';
export const GET_COUNTRY_FAILURE = 'GET_COUNTRY_FAILURE';

export const UPLOAD_PROFILE_IMAGE_REQUEST = 'UPLOAD_PROFILE_IMAGE_REQUEST';
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'UPLOAD_PROFILE_IMAGE_SUCCESS';
export const UPLOAD_PROFILE_IMAGE_FAILURE = 'UPLOAD_PROFILE_IMAGE_FAILURE';
/* Empty body is sent to the body as per the stucture of backend API */

export const uploadProfileImageRequest = (data) => ({
  type: UPLOAD_PROFILE_IMAGE_REQUEST,
  data,
});

export const uploadProfileImageSuccess = (data) => ({
  type: UPLOAD_PROFILE_IMAGE_SUCCESS,
  data,
});

export const uploadProfileImageFailure = () => ({
  type: UPLOAD_PROFILE_IMAGE_FAILURE,
});

export const getCountryRequest = () => {
  const body = {
  };
  return {
    type: GET_COUNTRY_REQUEST,
    body: JSON.stringify(body),
  };
};

export const getCountrySuccess = (data) => ({
  type: GET_COUNTRY_SUCCESS,
  data,
});

export const getCountryFailure = () => ({
  type: GET_COUNTRY_FAILURE,
});

/**
 * API to get the state list
 */

export const GET_STATE_REQUEST = 'GET_STATE_REQUEST';
export const GET_STATE_SUCCESS = 'GET_STATE_SUCCESS';
export const GET_STATE_FAILURE = 'GET_STATE_FAILURE';

export const getStateRequest = (countryId) => {
  const body = {
    master_country_id: countryId,
  };
  return {
    type: GET_STATE_REQUEST,
    body: JSON.stringify(body),
  };
};

export const getStateSuccess = (data) => ({
  type: GET_STATE_SUCCESS,
  data,
});

export const getStateFailure = () => ({
  type: GET_STATE_FAILURE,
});

/**
 * API to get the user profile data
 */

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const getProfileRequest = () => {
  const body = {
  };
  return {
    type: GET_PROFILE_REQUEST,
    body: JSON.stringify(body),
  };
};

export const getProfileSuccess = (data) => ({
  type: GET_PROFILE_SUCCESS,
  data,
});

export const getProfileFailure = () => ({
  type: GET_PROFILE_FAILURE,
});

/**
 * API to update the user profile data
 */

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

export const SET_USER_PROFILE_IMAGE = 'SET_USER_PROFILE_IMAGE';

export const updateProfileRequest = (profileDetails) => {

  const body = {
    user_name: profileDetails.user_name,
    first_name: profileDetails.fname,
    last_name: profileDetails.lname,
    email: profileDetails.email,
    phone_number: profileDetails.contact,
    address: profileDetails.address,
    city: profileDetails.city,
    master_country: profileDetails.countryId,
    master_state_id: profileDetails.stateId,
    dob: profileDetails.dob,
    gender: "0",
    pincode: profileDetails.pincode,
  };
  return {
    type: UPDATE_PROFILE_REQUEST,
    body: JSON.stringify(body),
  };
};

export const setUserProfileImage = url => ({
  type: SET_USER_PROFILE_IMAGE,
  url,
});

export const updateProfileSuccess = (data) => ({
  type: UPDATE_PROFILE_SUCCESS,
  data,
});

export const updateProfileFailure = () => ({
  type: UPDATE_PROFILE_FAILURE,
});

/**
 * API to get transaction list
 */

export const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const GET_TRANSACTIONS_FAILURE = 'GET_TRANSACTIONS_FAILURE';

export const getTransactionsRequest = () => {
  const body = {
    itemsPerPage: 10,
    currentPage: 1,
    status: -1,
    orderByField: 'C.start_date_time',
    sortOrder: 'ASC',
  };

  return {
    type: GET_TRANSACTIONS_REQUEST,
    body: JSON.stringify(body),
  };
};

export const getTransactionsSuccess = (data) => ({
  type: GET_TRANSACTIONS_SUCCESS,
  data,
});

export const getTransactionsFailure = () => ({
  type: GET_TRANSACTIONS_FAILURE,
});
