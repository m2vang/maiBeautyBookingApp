import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import notes from './notesReducer';

const store = combineReducers({
  user,
  login,
  notes,
});

export default store;
