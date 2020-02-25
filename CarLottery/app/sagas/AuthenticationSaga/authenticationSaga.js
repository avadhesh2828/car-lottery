import {
  call, takeLatest, put, all,
} from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';

import {
  GET_SPORTS_REQUEST,
  getSportsSuccess,
  getSportsFailure,
  LOGIN_REQUEST,
} from '../../actions/authenticationActions';

import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';

import {
  getSportsUrl,
  loginUrl,
} from '../../api/urls';

import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
} from '../APIHandler';

import { UserData } from '../../utils/global';
import Navigation from '../../utils/navigation';
import { Storage } from '../../storage/storage';
import constant from '../../utils/constant';
import { showPopupAlert } from '../../utils/showAlert';


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
  yield put(hideLoader());
  const { user } = parsedResponse;
  // yield put(setProfileImage(user.profile_pic, user.username));
  yield call(setUserDetailsInPersitantStorage, parsedResponse);
  UserData.user = user;
  UserData.SessionKey = parsedResponse.session_key;
  UserData.ProfileData = parsedResponse.profile_data;
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


function* loginRequest(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      loginUrl,
      METHOD_TYPE.POST,
      JSON.stringify(action.data),
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    console.log('parseResponse', parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      // TODO put response in user
      // UserData.user = parsedResponse;
      UserData.BearerToken = parsedResponse.access_token;
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
    takeLatest(LOGIN_REQUEST, loginRequest),
  ]);
}
