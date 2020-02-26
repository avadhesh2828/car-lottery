import { bindActionCreators } from 'redux';
import { store } from '../store';

import {
  getSportsRequest,
  getSportsSuccess,
  getSportsFailure,
  loginRequest,
  registerRequest,

} from './authenticationActions';

const actions = {
  getSportsRequest,
  getSportsSuccess,
  getSportsFailure,
  loginRequest,
  registerRequest,
};

export default bindActionCreators(actions, store.dispatch);