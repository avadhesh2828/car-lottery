import { fork } from 'redux-saga/effects';
import { sagaMiddleware } from '../store';
import sportsSaga from './Sport/sportsSaga';
import authenticationSaga from './AuthenticationSaga/authenticationSaga';
import dashboardSaga from './Dashboard/dashboardSaga';
import getCountriesSaga from './ProfileSaga/profileSaga';
import saferGamblingSaga from './SaferGambling/saferGamblingSaga';

function* root() {
  yield fork(sportsSaga);
  yield fork(authenticationSaga);
  yield fork(dashboardSaga);
  yield fork(getCountriesSaga);
  yield fork(saferGamblingSaga);
}

const run = () => sagaMiddleware.run(root);

export default run;
