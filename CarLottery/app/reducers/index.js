// @flow
import { combineReducers } from 'redux';
import loaderReducers from './loaderReducers';
import getSportsReducers from './getSportsReducers';
import dashboardReducer from './dashboardReducer';
import saferGamblingReducer from './saferGamblingReducer';
import getCountriesReducer from './getCountriesReducer';
import getStatesReducer from './getStatesReducer';
import getProfileDataReducer from './getProfileReducer';

const appReducer = combineReducers({
  loaderReducers,
  getSportsReducers,
  dashboardReducer,
  saferGamblingReducer,
  getCountriesReducer,
  getStatesReducer,
  getProfileDataReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
