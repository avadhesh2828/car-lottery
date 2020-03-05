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
} from './dashboardActions';

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
  getCountryRequest,
  getCountrySuccess,
  getCountryFailure,
  getStateRequest,
  getStateSuccess,
  getStateFailure,
};

export default bindActionCreators(actions, store.dispatch);
