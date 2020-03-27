import {
  call, takeLatest, put, all,
} from 'redux-saga/effects';
import { apiCall, apiCallWithMultipartContent } from '../../api/apiInterface';

import {
  GET_COUNTRY_REQUEST,
  GET_STATE_REQUEST,
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  GET_TRANSACTIONS_REQUEST,
  getTransactionsSuccess,
  getTransactionsFailure,
  getCountrySuccess,
  getCountryFailure,
  getStateSuccess,
  getStateFailure,
  getProfileSuccess,
  getProfileFailure,
  updateProfileSuccess,
  updateProfileFailure,
  INVITE_FRIEND_REQUEST,
  inviteFriendSuccess,
  inviteFriendFailure,
  sendInvitationFailure,
  sendInvitationSuccess,
  SEND_INVITATION_REQUEST,
  inviteFriendRequest,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  uploadProfileImageSuccess,
  uploadProfileImageFailure,
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
  getTransactionsUrl,
  inviteFriendUrl,
  sendInvitationUrl,
  uploadProfileImageUrl,
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
    console.log('error', error);
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
    console.log('error', error);
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
    console.log('error', error);
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
      showErrorMessage(response, parsedResponse);
      yield put(updateProfileSuccess(dataResponse.Data));
    } else {
      const obj = parsedResponse.Error;
      alert(obj[Object.keys(obj)[0]]);
      yield put(updateProfileFailure(parsedResponse));
    }
  } catch (error) {
    yield put(hideLoader());
    console.log('error', error);
    showExceptionErrorMessage();
    yield put(updateProfileFailure());
  }
}

function* getTransactionsRequest(action) {
  try {
    yield put(showLoader());
    const url = getTransactionsUrl;
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
      yield put(getTransactionsSuccess(dataResponse.Data));
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

function* inviteFriend(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      inviteFriendUrl,
      METHOD_TYPE.POST,
      JSON.stringify(action.data),
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      // showErrorMessage(response, parsedResponse);
      yield put(inviteFriendSuccess({
        dataResponse: dataResponse.Data,
        itemsPerPage: action.data.itemsPerPage,
        currentPage: action.data.currentPage,
      }));
    } else {
      yield put(inviteFriendFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(inviteFriendFailure());
  }
}

function* sendInvitationRequest(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      sendInvitationUrl,
      METHOD_TYPE.POST,
      JSON.stringify(action.data),
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      showErrorMessage(response, parsedResponse);
      yield put(sendInvitationSuccess(dataResponse.Data));
      yield put(inviteFriendRequest({
        itemsPerPage: 10,
        currentPage: 1,
      }));
    } else {
      yield put(sendInvitationFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(sendInvitationFailure());
  }
}

function* uploadProfileImage(action) {
  try {
    yield put(showLoader());
    const url = uploadProfileImageUrl;
    const response = yield call(
      apiCallWithMultipartContent,
      url,
      METHOD_TYPE.POST,
      action.data,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      // showErrorMessage(response, parsedResponse);
      yield put(uploadProfileImageSuccess(dataResponse.Data));
    } else {
      yield put(uploadProfileImageFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(uploadProfileImageFailure());
  }
}

export default function* getCountriesSaga() {
  yield all([
    takeLatest(GET_COUNTRY_REQUEST, getCountriesRequest),
    takeLatest(GET_STATE_REQUEST, getStatesRequest),
    takeLatest(GET_PROFILE_REQUEST, getProfileDataRequest),
    takeLatest(UPDATE_PROFILE_REQUEST, updateProfileDataRequest),
    takeLatest(GET_TRANSACTIONS_REQUEST, getTransactionsRequest),
    takeLatest(INVITE_FRIEND_REQUEST, inviteFriend),
    takeLatest(SEND_INVITATION_REQUEST, sendInvitationRequest),
    takeLatest(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImage),
  ]);
}
