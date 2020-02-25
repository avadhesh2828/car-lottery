import { bindActionCreators } from 'redux';
import { store } from '../store';

import {
  getSportsRequest,
  getSportsSuccess,
  getSportsFailure,
  loginRequest,

} from './authenticationActions';

const actions = {
  getSportsRequest,
  getSportsSuccess,
  getSportsFailure,
  loginRequest,
};

export default bindActionCreators(actions, store.dispatch);