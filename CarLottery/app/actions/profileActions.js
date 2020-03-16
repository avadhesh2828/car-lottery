/**
 * API to get the country list
 */

export const GET_COUNTRY_REQUEST = 'GET_COUNTRY_REQUEST';
export const GET_COUNTRY_SUCCESS = 'GET_COUNTRY_SUCCESS';
export const GET_COUNTRY_FAILURE = 'GET_COUNTRY_FAILURE';

/* Empty body is sent to the body as per the stucture of backend API */

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

export const updateProfileRequest = (profileDetails) => {
  const body = {
    first_name: profileDetails.fname,
    last_name: profileDetails.lname,
    email: profileDetails.email,
    phone_number: profileDetails.contact,
    address: profileDetails.address,
    city: profileDetails.city,
    master_country: profileDetails.countryId,
    master_state_id: profileDetails.stateId,
    dob: profileDetails.dob,
  };

  return {
    type: UPDATE_PROFILE_REQUEST,
    body: JSON.stringify(body),
  };
};

export const updateProfileSuccess = (data) => ({
  type: UPDATE_PROFILE_SUCCESS,
  data,
});

export const updateProfileFailure = () => ({
  type: UPDATE_PROFILE_FAILURE,
});
