import { fork } from 'redux-saga/effects';
import { sagaMiddleware } from '../store';
import sportsSaga from './Sport/sportsSaga';
import authenticationSaga from './AuthenticationSaga/authenticationSaga';
import dashboardSaga from './Dashboard/dashboardSaga';
import getCountriesSaga from './ProfileSaga/profileSaga';
import saferGamblingSaga from './SaferGambling/saferGamblingSaga';
import advertisementSaga from './AdvertisementSaga/advertisementSaga';
import notificationSaga from './Notification/notificationSaga';

function* root() {
  yield fork(sportsSaga);
  yield fork(authenticationSaga);
  yield fork(dashboardSaga);
  yield fork(getCountriesSaga);
  yield fork(saferGamblingSaga);
  yield fork(advertisementSaga);
  yield fork(notificationSaga);
}

const run = () => sagaMiddleware.run(root);

export default run;
