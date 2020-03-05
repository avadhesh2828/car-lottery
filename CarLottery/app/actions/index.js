import { bindActionCreators } from 'redux';
import { store } from '../store';

import {
  getSportsRequest,
  getSportsSuccess,
  getSportsFailure,
  loginRequest,
  registerRequest,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from './authenticationActions';

import {
  // Home
  getHotLotteriesRequest,
  getHotLotteriesSuccess,
  getHotLotteriesFailure,
  // lobby
  lobbyFilterRequest,
  lobbyFilterSuccess,
  lobbyFilterFailure,
  getLobbyHotLotteriesRequest,
  getLobbyHotLotteriesSuccess,
  getLobbyHotLotteriesFailure,
  updateLobbyCurrentPage,
  // my tickets
  myTicketsFilterRequest,
  myTicketsFilterSuccess,
  myTicketsFilterFailure,
  getMyLotteriesRequest,
  getMyLotteriesSuccess,
  getMyLotteriesFailure,
  getLotterieWinnersRequest,
  getLotterieWinnersSuccess,
  getLotterieWinnersFailure,
  getUserWinnerTicketsRequest,
  getUserWinnerTicketsSuccess,
  getUserWinnerTicketsFailure,
} from './dashboardActions';

import {
  getDepositLimitMonthsRequest,
  getDepositLimitMonthsSuccess,
  getDepositLimitMonthsFailure,
  getDepositLimitWeeksRequest,
  getDepositLimitWeeksSuccess,
  getDepositLimitWeeksFailure,
  getDepositLimitDaysRequest,
  getDepositLimitDaysSuccess,
  getDepositLimitDaysFailure,
  getWagerLimitMonthsRequest,
  getWagerLimitMonthsSuccess,
  getWagerLimitMonthsFailure,
  getWagerLimitWeeksRequest,
  getWagerLimitWeeksSuccess,
  getWagerLimitWeeksFailure,
  getWagerLimitDaysRequest,
  getWagerLimitDaysSuccess,
  getWagerLimitDaysFailure,
  setDepositLimitMonthsRequest,
  setDepositLimitMonthsSuccess,
  setDepositLimitMonthsFailure,
  setDepositLimitWeeksRequest,
  setDepositLimitWeeksSuccess,
  setDepositLimitWeeksFailure,
  setDepositLimitDaysRequest,
  setDepositLimitDaysSuccess,
  setDepositLimitDaysFailure,
  setWagerLimitMonthsRequest,
  setWagerLimitMonthsSuccess,
  setWagerLimitMonthsFailure,
  setWagerLimitWeeksRequest,
  setWagerLimitWeeksSuccess,
  setWagerLimitWeeksFailure,
  setWagerLimitDaysRequest,
  setWagerLimitDaysSuccess,
  setWagerLimitDaysFailure,
  deleteDepositLimitRequest,
  deleteDepositLimitFailure,
  deleteDepositLimitSuccess,
  deleteWagerLimitFailure,
  deleteWagerLimitRequest,
  deleteWagerLimitSuccess,
  selfTimeoutRequest,
  selfTimeoutFailure,
  selfTimeoutSuccess,
} from './saferGamblingActions';

import {
  getCountryRequest,
  getCountrySuccess,
  getCountryFailure,

  getStateRequest,
  getStateSuccess,
  getStateFailure,
} from './profileActions';

const actions = {
  getSportsRequest,
  getSportsSuccess,
  getSportsFailure,
  loginRequest,
  registerRequest,
  getHotLotteriesRequest,
  getHotLotteriesSuccess,
  getHotLotteriesFailure,
  lobbyFilterRequest,
  lobbyFilterSuccess,
  lobbyFilterFailure,
  getLobbyHotLotteriesRequest,
  getLobbyHotLotteriesSuccess,
  getLobbyHotLotteriesFailure,
  updateLobbyCurrentPage,
  myTicketsFilterRequest,
  myTicketsFilterSuccess,
  myTicketsFilterFailure,
  getMyLotteriesRequest,
  getMyLotteriesSuccess,
  getMyLotteriesFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  getLotterieWinnersRequest,
  getLotterieWinnersSuccess,
  getLotterieWinnersFailure,
  getUserWinnerTicketsRequest,
  getUserWinnerTicketsSuccess,
  getUserWinnerTicketsFailure,
  // safe gambling
  getDepositLimitMonthsRequest,
  getDepositLimitMonthsSuccess,
  getDepositLimitMonthsFailure,
  getDepositLimitWeeksRequest,
  getDepositLimitWeeksSuccess,
  getDepositLimitWeeksFailure,
  getDepositLimitDaysRequest,
  getDepositLimitDaysSuccess,
  getDepositLimitDaysFailure,
  getWagerLimitMonthsRequest,
  getWagerLimitMonthsSuccess,
  getWagerLimitMonthsFailure,
  getWagerLimitWeeksRequest,
  getWagerLimitWeeksSuccess,
  getWagerLimitWeeksFailure,
  getWagerLimitDaysRequest,
  getWagerLimitDaysSuccess,
  getWagerLimitDaysFailure,
  setDepositLimitMonthsRequest,
  setDepositLimitMonthsSuccess,
  setDepositLimitMonthsFailure,
  setDepositLimitWeeksRequest,
  setDepositLimitWeeksSuccess,
  setDepositLimitWeeksFailure,
  setDepositLimitDaysRequest,
  setDepositLimitDaysSuccess,
  setDepositLimitDaysFailure,
  setWagerLimitMonthsRequest,
  setWagerLimitMonthsSuccess,
  setWagerLimitMonthsFailure,
  setWagerLimitWeeksRequest,
  setWagerLimitWeeksSuccess,
  setWagerLimitWeeksFailure,
  setWagerLimitDaysRequest,
  setWagerLimitDaysSuccess,
  setWagerLimitDaysFailure,
  deleteDepositLimitRequest,
  deleteDepositLimitFailure,
  deleteDepositLimitSuccess,
  deleteWagerLimitFailure,
  deleteWagerLimitRequest,
  deleteWagerLimitSuccess,
  selfTimeoutRequest,
  selfTimeoutFailure,
  selfTimeoutSuccess,
  getCountryRequest,
  getCountrySuccess,
  getCountryFailure,
  getStateRequest,
  getStateSuccess,
  getStateFailure,
};

export default bindActionCreators(actions, store.dispatch);
