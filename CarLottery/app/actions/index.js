import { bindActionCreators } from 'redux';
import { store } from '../store';

import {
  getSportsRequest,
  getSportsSuccess,
  getSportsFailure,
  loginRequest,
  registerRequest,
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

  joinLotteryRequest,
  joinLotterySuccess,
  joinLotteryFailure,
} from './dashboardActions';

import {
  getCountryRequest,
  getCountrySuccess,
  getCountryFailure,

  getStateRequest,
  getStateSuccess,
  getStateFailure,

  getProfileRequest,
  getProfileFailure,
  getProfileSuccess,

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
  getCountryRequest,
  getCountrySuccess,
  getCountryFailure,
  getStateRequest,
  getStateSuccess,
  getStateFailure,
  getProfileRequest,
  getProfileFailure,
  getProfileSuccess,
  joinLotteryRequest,
  joinLotterySuccess,
  joinLotteryFailure,
};

export default bindActionCreators(actions, store.dispatch);
