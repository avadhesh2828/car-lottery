import {
  call, takeLatest, put, all,
} from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';

import {
  GET_SPORTS_REQUEST,
  getSportsSuccess,
  getSportsFailure,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  changepasswordFailure,
  changepasswordSuccess,
  openLoginView,
  logoutSuccess,
  logoutFailure,
  LOGOUT_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  forgetpasswordSuccess,
  forgetpasswordFailure,
  logoutRequest,
} from '../../actions/authenticationActions';

import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';

import {
  getSportsUrl,
  loginUrl,
  signupUrl,
  logoutUrl,
  forgetpasswordUrl,
  changepasswordUrl,
} from '../../api/urls';

import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
  showSuccessMessage,
} from '../APIHandler';

import { UserData } from '../../utils/global';
import Navigation from '../../utils/navigation';
import { Storage } from '../../storage/storage';
import constant, { screenNames } from '../../utils/constant';
import { showPopupAlert, showPopupAlertWithTitle } from '../../utils/showAlert';
import { logout } from '../../utils/utils_functions';


// Login Apis
function setUserDetailsInPersitantStorage(parsedResponse) {
  const { session_key, profile_data } = parsedResponse.Data;
  Storage.setItemWithKeyAndValue(constant.SESSION_KEY, session_key);
  Storage.setItemWithKeyAndValue(constant.PROFILE_DATA, profile_data);
  // Storage.setItemWithKeyAndValue(constant.USER_DISPLAY_NAME, user.username);
  // Storage.setItemWithKeyAndValue(constant.USER_PROFILE_IMAGE_URL, user.profile_pic);
  // Storage.setItemWithKeyAndValue(constant.USER_LIMIT, user.reality_check_limit);
}

function* loginRequestSuccess(parsedResponse) {
  // console.log('parsedResponse', parsedResponse);
  yield put(hideLoader());
  const { user } = parsedResponse;
  // yield put(setProfileImage(user.profile_pic, user.username));
  yield call(setUserDetailsInPersitantStorage, parsedResponse);
  UserData.SessionKey = parsedResponse.Data.session_key;
  UserData.ProfileData = parsedResponse.Data.profile_data;
  Navigation.sharedInstance().resetRouteName('TabLoginNavigator');
  // TODO: Will remove with dashboard refactor code.
  // yield put(userLoginSucces(parsedResponse));
  // yield put(userLoginStatus(true));
  // yield put(getProfileRequest());
  // const screen = 'DrawerStackAfterLogin';
  // Navigation.sharedInstance().resetRouteName(
  //   screen,
  //   {
  //     isPortrait: true,
  //     // screenOrientation: screenProps.orientation,
  //   },
  // );
}

function* loginRequestFailed(response, parsedResponse) {
  if (parsedResponse && parsedResponse.Error) {
    let errorMsg;
    if (parsedResponse.Error.email) {
      errorMsg = parsedResponse.Error.email;
      showPopupAlert(parsedResponse.Error.email);
    }
    if (parsedResponse.Error.password) {
      errorMsg = errorMsg.concat(' ', parsedResponse.Error.password);
    }
    showPopupAlert(errorMsg);
  } else {
    yield call(showErrorMessage, response, parsedResponse);
  }
  yield put(hideLoader());
  // yield put(userLoginStatus(false));
}


function* login(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      loginUrl,
      METHOD_TYPE.POST,
      JSON.stringify(action.data),
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    // console.log('parseRes1', parsedResponse);
    // console.log('parseResponse', parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      // TODO put response in user
      // UserData.user = parsedResponse;
      UserData.SessionKey = parsedResponse.Data.session_key;
      yield call(loginRequestSuccess, parsedResponse);
    } else {
      // yield put(userLoginFailure(parsedResponse));
      yield call(loginRequestFailed, response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    console.log('error', error);
    // yield put(userLoginFailure());
    showExceptionErrorMessage();
    // yield put(userLoginStatus(false));
  }
}

export const userLogoutSucess = () => {
  logout();
};

// User logout request
function* logoutApi() {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      logoutUrl,
      METHOD_TYPE.POST,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      yield call(userLogoutSucess);
      yield put(logoutSuccess());
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(logoutFailure());
    }
    yield put(hideLoader());
  } catch (error) {
    console.log('error', error);
    showExceptionErrorMessage();
    yield put(logoutFailure());
    yield put(hideLoader());
  }
}

function* signupRequest(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      signupUrl,
      METHOD_TYPE.POST,
      JSON.stringify(action.data),
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    // console.log('parseResponse', parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      // showPopupAlert('signup success');
      showSuccessMessage(parsedResponse);
      yield put(openLoginView());
      Navigation.sharedInstance().pushToScreen(screenNames.LOGIN_SCREEN);
      // TODO put response in user
      // UserData.user = parsedResponse;
      // UserData.BearerToken = parsedResponse.access_token;
      // yield call(loginRequestSuccess, parsedResponse);
    } else {
      showErrorMessage(response, parsedResponse);
      // yield put(userLoginFailure(parsedResponse));
      // yield call(loginRequestFailed, response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    console.log('error', error);
    // yield put(userLoginFailure());
    showExceptionErrorMessage();
    // yield put(userLoginStatus(false));
  }
}

function* changepasswordRequest(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      changepasswordUrl,
      METHOD_TYPE.POST,
      JSON.stringify(action.data),
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    // console.log('parseResponse', parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      // showPopupAlert('signup success');
      showSuccessMessage(parsedResponse);
      yield put(logoutRequest());
      // TODO put response in user
      // UserData.user = parsedResponse;
      // UserData.BearerToken = parsedResponse.access_token;
      // yield call(loginRequestSuccess, parsedResponse);
    } else {
      showErrorMessage(response, parsedResponse);
      // yield put(userLoginFailure(parsedResponse));
      // yield call(loginRequestFailed, response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    console.log('error', error);
    // yield put(userLoginFailure());
    showExceptionErrorMessage();
    // yield put(userLoginStatus(false));
  }
}

function* forgetpasswordRequest(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      forgetpasswordUrl,
      METHOD_TYPE.POST,
      JSON.stringify(action.data),
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    yield put(hideLoader());
    // console.log('parseRes1', parsedResponse);
    // console.log('parseResponse', parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      showSuccessMessage(parsedResponse);
      yield put(forgetpasswordSuccess(parsedResponse));
      yield put(openLoginView());
    } else {
      // yield put(userLoginFailure(parsedResponse));
      yield put(forgetpasswordFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    console.log('error', error);
    // yield put(userLoginFailure());
    showExceptionErrorMessage();
    // yield put(userLoginStatus(false));
  }
}


// get SportsList
function* getSportsList(action) {
  try {
    yield put(showLoader());
    const url = getSportsUrl;
    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.GET,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      yield put(getSportsSuccess(dataResponse));
    } else {
      yield put(getSportsFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getSportsFailure());
  }
}

export default function* sportsSaga() {
  yield all([
    takeLatest(GET_SPORTS_REQUEST, getSportsList),
    takeLatest(LOGIN_REQUEST, login),
    takeLatest(LOGOUT_REQUEST, logoutApi),
    takeLatest(REGISTER_REQUEST, signupRequest),
    takeLatest(FORGOT_PASSWORD_REQUEST, forgetpasswordRequest),
    takeLatest(CHANGE_PASSWORD_REQUEST, changepasswordRequest),
  ]);
}
