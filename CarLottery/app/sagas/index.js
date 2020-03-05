import { fork } from 'redux-saga/effects';
import { sagaMiddleware } from '../store';
import sportsSaga from './Sport/sportsSaga';
import authenticationSaga from './AuthenticationSaga/authenticationSaga';
import dashboardSaga from './Dashboard/dashboardSaga';
import saferGamblingSaga from './SaferGambling/saferGamblingSaga';
import getCountriesSaga from './ProfileSaga/profileSaga';

function* root() {
  yield fork(sportsSaga);
  yield fork(authenticationSaga);
  yield fork(dashboardSaga);
  yield fork(saferGamblingSaga);
  yield fork(getCountriesSaga);
}

const run = () => sagaMiddleware.run(root);

export default run;
