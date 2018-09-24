import { combineReducers } from 'redux';

const clientNotes = (state = [], action) => {
    if (action.type === 'FETCH_ADMIN_CLIENT_NOTES') {
        return action.payload;
    }
    return state;
};

export default combineReducers({
    clientNotes,
});