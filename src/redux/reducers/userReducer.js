import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const id = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.id || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const first_name = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.first_name;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const last_name = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.last_name;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const telephone = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.telephone;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const email = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.email || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const if_stylist = (state = false, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      if (action.user.hasOwnProperty('if_stylist')) {
        return (
          action.user.if_stylist
        )
      } else {
        return state;
      }
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case USER_ACTIONS.REQUEST_START:
      return true;
    case USER_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  id,
  first_name,
  last_name,
  telephone,
  email,
  if_stylist,
  isLoading,
});
