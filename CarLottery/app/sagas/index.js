import { fork } from 'redux-saga/effects';
import { sagaMiddleware } from '../store';
import sportsSaga from './Sport/sportsSaga';
import authenticationSaga from './AuthenticationSaga/authenticationSaga';

function* root() {
  yield fork(sportsSaga);
  yield fork(authenticationSaga);
}

const run = () => sagaMiddleware.run(root);

export default run;
