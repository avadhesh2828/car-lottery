import {
  call, takeLatest, put, all,
} from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';

import {
  GET_HEADER_AD_REQUEST,
  GET_FOOTER_AD_REQUEST,
  getHeaderAdSuccess,
  getHeaderAdFailure,
  getFooterAdSuccess,
  getFooterAdFailure,

} from '../../actions/advertisementActions';

import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';

import {
  headerAdUrl,
  FooterAdUrl,
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
import { showPopupAlert } from '../../utils/showAlert';

function* getHeaderAd(action) {
  try {
    yield put(showLoader());
    const url = headerAdUrl;
    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.POST,
      JSON.stringify(action.data),
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    // console.log('parsedResponse', parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      yield put(getHeaderAdSuccess(dataResponse));
    } else {
      yield put(getHeaderAdFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getHeaderAdFailure());
  }
}

function* getFooterAd(action) {
  try {
    yield put(showLoader());
    const url = FooterAdUrl;
    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.POST,
      JSON.stringify(action.data),
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    // console.log('parsedResponse', parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      yield put(getFooterAdSuccess(dataResponse));
    } else {
      yield put(getFooterAdFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getFooterAdFailure());
  }
}

export default function* dashboardSaga() {
  yield all([
    takeLatest(GET_HEADER_AD_REQUEST, getHeaderAd),
    takeLatest(GET_FOOTER_AD_REQUEST, getFooterAd),
  ]);
}
