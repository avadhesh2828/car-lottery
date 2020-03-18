
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILURE = 'LOGIN_REQUEST_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
// export const USER_LOGIN_STATUS = 'USER_LOGIN_STATUS';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';

export const GET_SPORTS_REQUEST = 'GET_SPORTS_REQUEST';
export const GET_SPORTS_SUCCESS = 'GET_SPORTS_SUCCESS';
export const GET_SPORTS_FAILURE = 'GET_SPORTS_FAILURE';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_FORGOT_PASSWORD = 'AUTH_FORGOT_PASSWORD';

// LOGIN APIS
export const loginRequest = (data) => ({
  type: LOGIN_REQUEST,
  data,
});

export const forgetpasswordRequest = (data) => ({
  type: FORGOT_PASSWORD_REQUEST,
  data,
});

export const forgetpasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

export const forgetpasswordFailure = () => ({
  type: FORGOT_PASSWORD_FAILURE,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = () => ({
  type: LOGOUT_FAILURE,
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

export const registerRequest = (data) => ({
  type: REGISTER_REQUEST,
  data,
});

// Auth Welcome View
export const openLoginView = () => ({
  type: AUTH_LOGIN,
});

export const openAuthForgotPasswordView = () => ({
  type: AUTH_FORGOT_PASSWORD,
});
