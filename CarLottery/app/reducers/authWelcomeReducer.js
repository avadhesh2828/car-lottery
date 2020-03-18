/* eslint no-underscore-dangle: 0 */

import {
  AUTH_LOGIN,
  AUTH_FORGOT_PASSWORD,
} from '../actions/authenticationActions';
import { AuthWelcomeView } from '../utils/enum';

const initialState = {
  currentAuthWelcomeView: AuthWelcomeView.AUTH_LOGIN,
  loginUserData: {},
  homeMenuData: [],
  userLoginStatus: false,
};

function authWelcomeReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        currentAuthWelcomeView: AuthWelcomeView.AUTH_LOGIN,
      };

    case AUTH_FORGOT_PASSWORD:
      return {
        ...state,
        currentAuthWelcomeView: AuthWelcomeView.AUTH_FORGOT_PASSWORD,
      };

    default:
      return state;
  }
}

export default authWelcomeReducer;
