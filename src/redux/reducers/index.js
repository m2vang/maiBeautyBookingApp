import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import available from './availableReducer';

const store = combineReducers({
  user,
  login,
  available
});

export default store;
