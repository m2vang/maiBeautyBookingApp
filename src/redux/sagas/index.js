import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import unavailabilitySaga from './unavailabilitySaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    unavailabilitySaga(),
    // watchIncrementAsync()
  ]);
}
