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

const appReducer = combineReducers({
  loaderReducers,
  getSportsReducers,
  dashboardReducer,
  getCountriesReducer,
  getStatesReducer,
  getProfileDataReducer,
  saferGamblingReducer,
  authWelcomeReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
