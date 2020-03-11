// @flow
import { combineReducers } from 'redux';
import loaderReducers from './loaderReducers';
import getSportsReducers from './getSportsReducers';
import dashboardReducer from './dashboardReducer';
import saferGamblingReducer from './saferGamblingReducer';

const appReducer = combineReducers({
  loaderReducers,
  getSportsReducers,
  dashboardReducer,
  saferGamblingReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
