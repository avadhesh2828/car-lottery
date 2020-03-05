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
