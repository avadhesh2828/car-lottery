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
};

export default bindActionCreators(actions, store.dispatch);
