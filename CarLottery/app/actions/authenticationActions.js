
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILURE = 'LOGIN_REQUEST_FAILURE';
// export const USER_LOGIN_STATUS = 'USER_LOGIN_STATUS';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';

export const GET_SPORTS_REQUEST = 'GET_SPORTS_REQUEST';
export const GET_SPORTS_SUCCESS = 'GET_SPORTS_SUCCESS';
export const GET_SPORTS_FAILURE = 'GET_SPORTS_FAILURE';

// LOGIN APIS
export const loginRequest = (data) => ({
  type: LOGIN_REQUEST,
  data,
});

// GET SPORTS LIST
export const getSportsRequest = () => {
  return {
    type: GET_SPORTS_REQUEST,
  };
};

export const getSportsSuccess = (data) => ({
  type: GET_SPORTS_SUCCESS,
  data,
});

export const getSportsFailure = () => ({
  type: GET_SPORTS_FAILURE,
});

