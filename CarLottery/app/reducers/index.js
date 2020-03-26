// @flow
import { combineReducers } from 'redux';
import loaderReducers from './loaderReducers';
import getSportsReducers from './getSportsReducers';
import dashboardReducer from './dashboardReducer';
import getCountriesReducer from './getCountriesReducer';
import getStatesReducer from './getStatesReducer';
import getProfileDataReducer from './getProfileReducer';
import saferGamblingReducer from './saferGamblingReducer';
import authWelcomeReducer from './authWelcomeReducer';
import getTransactionsReducer from './getTransactionsReducer';
import getInviteFriendReducer from './InviteFriendRedducer';

const appReducer = combineReducers({
  loaderReducers,
  getSportsReducers,
  dashboardReducer,
  getCountriesReducer,
  getStatesReducer,
  getProfileDataReducer,
  saferGamblingReducer,
  authWelcomeReducer,
  getTransactionsReducer,
  getInviteFriendReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
