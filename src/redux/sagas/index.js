import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import availabilitySaga from './availabilitySaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    availabilitySaga(),
    // watchIncrementAsync()
  ]);
}
