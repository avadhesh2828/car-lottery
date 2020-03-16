import {
  call, takeLatest, put, all,
} from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';

import {
  GET_HOT_LOTTERIES_REQUEST,
  getHotLotteriesSuccess,
  getHotLotteriesFailure,
  LOBBY_FILTER_REQUEST,
  lobbyFilterSuccess,
  lobbyFilterFailure,
  GET_LOBBY_HOT_LOTTERIES_REQUEST,
  getLobbyHotLotteriesSuccess,
  getLobbyHotLotteriesFailure,

  JOIN_LOTTERY_REQUEST,
  joinLotterySuccess,
  joinLotteryFailure,
  getLobbyHotLotteriesRequest,
  MYTICKETS_FILTER_REQUEST,
  myTicketsFilterSuccess,
  myTicketsFilterFailure,
  GET_MY_LOTTERIES_REQUEST,
  getMyLotteriesSuccess,
  getMyLotteriesFailure,
  getMyLotteriesRequest,
  GET_LOTTERIE_WINNERS_REQUEST,
  getLotterieWinnersSuccess,
  getLotterieWinnersFailure,
  GET_USER_WINNER_TICKETS_REQUEST,
  getUserWinnerTicketsSuccess,
  getUserWinnerTicketsFailure,

} from '../../actions/dashboardActions';

import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';

import {
  commonHotLotteriesUrl,
  lobbyFilterUrl,
  joinContestUrl,
  lobbyListUrl,
  myTicketsFilterUrl,
  myLotteriesUrl,
  lotteriesWinnerUrl,
  userWinnerTicketsUrl,
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

// Home Page
function* getHotLotteries(action) {
  try {
    yield put(showLoader());
    const url = commonHotLotteriesUrl;
    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.POST,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    // console.log('parsedResponse', parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      yield put(getHotLotteriesSuccess(dataResponse));
    } else {
      yield put(getHotLotteriesFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getHotLotteriesFailure());
  }
}

function* getLobbyHotLotteries(action) {
  try {
    yield put(showLoader());
    const url = lobbyListUrl;
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
      yield put(getLobbyHotLotteriesSuccess({
        response: dataResponse,
        current_page: action.data.current_page,
        items_perpage: action.data.items_perpage,
      }));
    } else {
      yield put(getLobbyHotLotteriesFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getLobbyHotLotteriesFailure());
  }
}

// Lobby Page
function* lobbyFilter(action) {
  try {
    yield put(showLoader());
    const url = lobbyFilterUrl;
    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.GET,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    // console.log('parsedResponse', parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      yield put(lobbyFilterSuccess(dataResponse));
      yield put(getLobbyHotLotteriesRequest({
        items_perpage: 10,
        current_page: 1,
        sort_field: '',
        sort_order: '',
        keyword: '',
        minEntryFee: dataResponse.Data.min_entry_fee,
        maxEntryFee: dataResponse.Data.max_entry_fee,
        only_hot_lotteries: false,
      }));
    } else {
      yield put(lobbyFilterFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    console.log('errror', error);
    showExceptionErrorMessage();
    yield put(lobbyFilterFailure());
  }
}
// MY Lotteries
function* getMyLotteries(action) {
  try {
    yield put(showLoader());
    const url = myLotteriesUrl;
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
      yield put(getMyLotteriesSuccess({
        response: dataResponse,
        current_page: action.data.current_page,
        items_perpage: action.data.items_perpage,
      }));
    } else {
      yield put(getMyLotteriesFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getMyLotteriesFailure());
  }
}

// My Tickets Page
function* myTicketsFilter(action) {
  try {
    yield put(showLoader());
    const url = myTicketsFilterUrl;
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
      yield put(myTicketsFilterSuccess(dataResponse));
      yield put(getMyLotteriesRequest({
        items_perpage: 10,
        current_page: 1,
        sort_field: 'C.status',
        sort_order: 'ASC',
        status: 'all',
        keyword: '',
        minEntryFee: dataResponse.Data.min_entry_fee,
        maxEntryFee: dataResponse.Data.max_entry_fee,
        only_hot_lotteries: true,
      }));
    } else {
      yield put(myTicketsFilterFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    console.log('errror', error);
    showExceptionErrorMessage();
    yield put(myTicketsFilterFailure());
  }
}

function* getLotterieWinners(action) {
  try {
    yield put(showLoader());
    const url = lotteriesWinnerUrl;
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
      yield put(getLotterieWinnersSuccess(dataResponse));
    } else {
      yield put(getLotterieWinnersFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getLotterieWinnersFailure());
  }
}

function* getUserWinnerTickets(action) {
  try {
    yield put(showLoader());
    const url = userWinnerTicketsUrl;
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
      yield put(getUserWinnerTicketsSuccess(dataResponse));
    } else {
      yield put(getUserWinnerTicketsFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getUserWinnerTicketsFailure());
  }
}

function* joinLotteries(action) {
  try {
    yield put(showLoader());
    const url = joinContestUrl;
    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.POST,
      action.body,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    // console.log('parsedResponse', parsedResponse);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      dataResponse = parsedResponse;
      showErrorMessage(response, parsedResponse);
      yield put(joinLotterySuccess(dataResponse));
    } else {
      yield put(joinLotteryFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(joinLotteryFailure());
  }
}


export default function* dashboardSaga() {
  yield all([
    takeLatest(GET_HOT_LOTTERIES_REQUEST, getHotLotteries),
    takeLatest(LOBBY_FILTER_REQUEST, lobbyFilter),
    takeLatest(GET_LOBBY_HOT_LOTTERIES_REQUEST, getLobbyHotLotteries),
    takeLatest(JOIN_LOTTERY_REQUEST, joinLotteries),
    takeLatest(MYTICKETS_FILTER_REQUEST, myTicketsFilter),
    takeLatest(GET_MY_LOTTERIES_REQUEST, getMyLotteries),
    takeLatest(GET_LOTTERIE_WINNERS_REQUEST, getLotterieWinners),
    takeLatest(GET_USER_WINNER_TICKETS_REQUEST, getUserWinnerTickets),
  ]);
}
