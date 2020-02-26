// @flow
import { combineReducers } from 'redux';
import loaderReducers from './loaderReducers';
import getSportsReducers from './getSportsReducers';
import dashboardReducer from './dashboardReducer';

const appReducer = combineReducers({
  loaderReducers,
  getSportsReducers,
  dashboardReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
