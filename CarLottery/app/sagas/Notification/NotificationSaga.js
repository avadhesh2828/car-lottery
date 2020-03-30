import {
  call, takeLatest, put, all,
} from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';

import {
  GET_ALL_NOTIFICATIONS_REQUEST,
  getAllNotificationsFailure,
  getAllNotificationsSuccess,
  USER_UNREAD_NOTIFICATION_REQUEST,
  userUnreadNotificationSuccess,
  userUnreadNotificationFailure,
} from '../../actions/notificationActions';

import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';

import {
  getAllNotificationsUrl, userUnreadNotificationsUrl,
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

// GET NOTIFICATIONS
function* getAllNotifications(action) {
  try {
    yield put(showLoader());
    const url = getAllNotificationsUrl;
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
      yield put(getAllNotificationsSuccess({
        response: dataResponse,
        current_page: action.data.current_page,
        items_perpage: action.data.items_perpage,
      }));
    } else {
      yield put(getAllNotificationsFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getAllNotificationsFailure());
  }
}

function* userUnreadNotification(action) {
  try {
    yield put(showLoader());
    const url = userUnreadNotificationsUrl;
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
      yield put(userUnreadNotificationSuccess(dataResponse));
    } else {
      yield put(userUnreadNotificationFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(userUnreadNotificationFailure());
  }
}


export default function* dashboardSaga() {
  yield all([
    takeLatest(GET_ALL_NOTIFICATIONS_REQUEST, getAllNotifications),
    takeLatest(USER_UNREAD_NOTIFICATION_REQUEST, userUnreadNotification),
  ]);
}
