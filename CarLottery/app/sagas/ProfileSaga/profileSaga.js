import {
  call, takeLatest, put, all,
} from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';

import {
  GET_COUNTRY_REQUEST,
  GET_STATE_REQUEST,
  getCountrySuccess,
  getCountryFailure,
  getStateSuccess,
  getStateFailure,
} from '../../actions/profileActions';

import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';

import {
  getCountriesUrl,
  getStatesbyCountryUrl
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
    console.log("<><><><>111", parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      showErrorMessage(response, parsedResponse);
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
    console.log("<><><><>222", parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      showErrorMessage(response, parsedResponse);
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

export default function* getCountriesSaga() {
  yield all([
    takeLatest(GET_COUNTRY_REQUEST, getCountriesRequest),
    takeLatest(GET_STATE_REQUEST, getStatesRequest),
  ]);
}
