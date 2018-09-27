import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import unavailable from './unavailableReducer';

const store = combineReducers({
  user,
  login,
  unavailable
});

export default store;
