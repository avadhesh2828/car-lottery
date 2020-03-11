import {
  call, takeLatest, put, all,
} from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';

import {
  getDepositLimitMonthsSuccess,
  getDepositLimitMonthsFailure,
  getDepositLimitWeeksFailure,
  getDepositLimitWeeksSuccess,
  getDepositLimitDaysFailure,
  getDepositLimitDaysSuccess,
  setDepositLimitMonthsSuccess,
  setDepositLimitMonthsFailure,
  setDepositLimitWeeksFailure,
  setDepositLimitWeeksSuccess,
  setDepositLimitDaysFailure,
  setDepositLimitDaysSuccess,
  getWagerLimitMonthsSuccess,
  getWagerLimitMonthsFailure,
  getWagerLimitWeeksFailure,
  getWagerLimitWeeksSuccess,
  getWagerLimitDaysFailure,
  getWagerLimitDaysSuccess,
  setWagerLimitMonthsSuccess,
  setWagerLimitMonthsFailure,
  setWagerLimitDaysSuccess,
  setWagerLimitDaysFailure,
  setWagerLimitWeeksFailure,
  setWagerLimitWeeksSuccess,
  GET_DEPOSIT_LIMIT_MONTHS_REQUEST,
  GET_DEPOSIT_LIMIT_WEEKS_REQUEST,
  GET_DEPOSIT_LIMIT_DAYS_REQUEST,
  SET_DEPOSIT_LIMIT_MONTHS_REQUEST,
  SET_DEPOSIT_LIMIT_WEEKS_REQUEST,
  SET_DEPOSIT_LIMIT_DAYS_REQUEST,
  GET_WAGER_LIMIT_WEEKS_REQUEST,
  GET_WAGER_LIMIT_DAYS_REQUEST,
  SET_WAGER_LIMIT_MONTHS_REQUEST,
  SET_WAGER_LIMIT_WEEKS_REQUEST,
  SET_WAGER_LIMIT_DAYS_REQUEST,
  GET_WAGER_LIMIT_MONTHS_REQUEST,
} from '../../actions/saferGamblingActions';

import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';

import {
  getDepositLimitUrl,
  setDepositLimitUrl,
  getWagerLimitUrl,
  setWagerLimitUrl,
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


function* getDepositLimitMonths(action) {
  try {
    yield put(showLoader());
    const url = getDepositLimitUrl;
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
      yield put(getDepositLimitMonthsSuccess(dataResponse));
    } else {
      yield put(getDepositLimitMonthsFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getDepositLimitMonthsFailure());
  }
}

function* getDepositLimitWeeks(action) {
  try {
    yield put(showLoader());
    const url = getDepositLimitUrl;
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
      yield put(getDepositLimitWeeksSuccess(dataResponse));
    } else {
      yield put(getDepositLimitWeeksFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getDepositLimitWeeksFailure());
  }
}

function* getDepositLimitDays(action) {
  try {
    yield put(showLoader());
    const url = getDepositLimitUrl;
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
      yield put(getDepositLimitDaysSuccess(dataResponse));
    } else {
      yield put(getDepositLimitDaysFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getDepositLimitDaysFailure());
  }
}

// =========
function* setDepositLimitMonths(action) {
  try {
    yield put(showLoader());
    const url = setDepositLimitUrl;
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
      yield put(setDepositLimitMonthsSuccess(dataResponse));
    } else {
      yield put(setDepositLimitMonthsFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(setDepositLimitMonthsFailure());
  }
}

function* setDepositLimitWeeks(action) {
  try {
    yield put(showLoader());
    const url = setDepositLimitUrl;
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
      yield put(setDepositLimitWeeksSuccess(dataResponse));
    } else {
      yield put(setDepositLimitWeeksFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(setDepositLimitWeeksFailure());
  }
}

function* setDepositLimitDays(action) {
  try {
    yield put(showLoader());
    const url = setDepositLimitUrl;
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
      yield put(setDepositLimitDaysSuccess(dataResponse));
    } else {
      yield put(setDepositLimitDaysFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(setDepositLimitDaysFailure());
  }
}

// =================

function* getWagerLimitMonths(action) {
  try {
    yield put(showLoader());
    const url = getWagerLimitUrl;
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
      yield put(getWagerLimitMonthsSuccess(dataResponse));
    } else {
      yield put(getWagerLimitMonthsFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getWagerLimitMonthsFailure());
  }
}

function* getWagerLimitWeeks(action) {
  try {
    yield put(showLoader());
    const url = getWagerLimitUrl;
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
      yield put(getWagerLimitWeeksSuccess(dataResponse));
    } else {
      yield put(getWagerLimitWeeksFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getWagerLimitWeeksFailure());
  }
}

function* getWagerLimitDays(action) {
  try {
    yield put(showLoader());
    const url = getWagerLimitUrl;
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
      yield put(getWagerLimitDaysSuccess(dataResponse));
    } else {
      yield put(getWagerLimitDaysFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getWagerLimitDaysFailure());
  }
}

// ====setting wager limit
function* setWagerLimitMonths(action) {
  try {
    yield put(showLoader());
    const url = setWagerLimitUrl;
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
      yield put(setWagerLimitMonthsSuccess(dataResponse));
    } else {
      yield put(setWagerLimitMonthsFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(setWagerLimitMonthsFailure());
  }
}

function* setWagerLimitWeeks(action) {
  try {
    yield put(showLoader());
    const url = setWagerLimitUrl;
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
      yield put(setWagerLimitWeeksSuccess(dataResponse));
    } else {
      yield put(setWagerLimitWeeksFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(setWagerLimitWeeksFailure());
  }
}

function* setWagerLimitDays(action) {
  try {
    yield put(showLoader());
    const url = setWagerLimitUrl;
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
      yield put(setWagerLimitDaysSuccess(dataResponse));
    } else {
      yield put(setWagerLimitDaysFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(setWagerLimitDaysFailure());
  }
}

export default function* saferGamblingSaga() {
  yield all([
    takeLatest(GET_DEPOSIT_LIMIT_MONTHS_REQUEST, getDepositLimitMonths),
    takeLatest(GET_DEPOSIT_LIMIT_WEEKS_REQUEST, getDepositLimitWeeks),
    takeLatest(GET_DEPOSIT_LIMIT_DAYS_REQUEST, getDepositLimitDays),
    takeLatest(SET_DEPOSIT_LIMIT_MONTHS_REQUEST, setDepositLimitMonths),
    takeLatest(SET_DEPOSIT_LIMIT_WEEKS_REQUEST, setDepositLimitWeeks),
    takeLatest(SET_DEPOSIT_LIMIT_DAYS_REQUEST, setDepositLimitDays),
    takeLatest(GET_WAGER_LIMIT_MONTHS_REQUEST, getWagerLimitMonths),
    takeLatest(GET_WAGER_LIMIT_WEEKS_REQUEST, getWagerLimitWeeks),
    takeLatest(GET_WAGER_LIMIT_DAYS_REQUEST, getWagerLimitDays),
    takeLatest(SET_WAGER_LIMIT_MONTHS_REQUEST, setWagerLimitMonths),
    takeLatest(SET_WAGER_LIMIT_WEEKS_REQUEST, setWagerLimitWeeks),
    takeLatest(SET_WAGER_LIMIT_DAYS_REQUEST, setWagerLimitDays),
  ]);
}
