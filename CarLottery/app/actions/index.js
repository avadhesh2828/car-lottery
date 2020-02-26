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
  getHotLotteriesRequest,
  getHotLotteriesSuccess,
  getHotLotteriesFailure,
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
};

export default bindActionCreators(actions, store.dispatch);
