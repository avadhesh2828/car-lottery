import {
  call, takeLatest, put, all,
} from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';

import {
  GET_COUNTRY_REQUEST,
  GET_STATE_REQUEST,
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  getCountrySuccess,
  getCountryFailure,
  getStateSuccess,
  getStateFailure,
  getProfileSuccess,
  getProfileFailure,
  updateProfileSuccess,
} from '../../actions/profileActions';

import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';

import {
  getCountriesUrl,
  getStatesbyCountryUrl,
  getProfileDataUrl,
  updateProfileDataUrl,
} from '../../api/urls';

import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
} from '../APIHandler';

function* getCountriesRequest(action) {
  try {
    yield put(showLoader());
    const url = getCountriesUrl;
    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.POST,
      action.body,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      yield put(getCountrySuccess(dataResponse));
    } else {
      yield put(getCountryFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getCountryFailure());
  }
}

function* getStatesRequest(action) {
  try {
    yield put(showLoader());
    const url = getStatesbyCountryUrl;
    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.POST,
      action.body,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      // showErrorMessage(response, parsedResponse);
      yield put(getStateSuccess(dataResponse));
    } else {
      yield put(getStateFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getStateFailure());
  }
}

function* getProfileDataRequest(action) {
  try {
    yield put(showLoader());
    const url = getProfileDataUrl;
    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.POST,
      action.body,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      // showErrorMessage(response, parsedResponse);
      yield put(getProfileSuccess(dataResponse.Data));
    } else {
      yield put(getProfileFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getProfileFailure());
  }
}

function* updateProfileDataRequest(action) {
  try {
    yield put(showLoader());
    const url = updateProfileDataUrl;
    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.POST,
      action.body,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      // showErrorMessage(response, parsedResponse);
      yield put(updateProfileSuccess(dataResponse.Data));
    } else {
      yield put(getProfileFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getProfileFailure());
  }
}


export default function* getCountriesSaga() {
  yield all([
    takeLatest(GET_COUNTRY_REQUEST, getCountriesRequest),
    takeLatest(GET_STATE_REQUEST, getStatesRequest),
    takeLatest(GET_PROFILE_REQUEST, getProfileDataRequest),
    takeLatest(UPDATE_PROFILE_REQUEST, updateProfileDataRequest),
  ]);
}
