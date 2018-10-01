import { combineReducers } from 'redux';
import { UNAVAILABLE_ACTIONS } from '../actions/unavailableActions';

const appointment = (state = [], action) => {
    switch (action.type) {
        case UNAVAILABLE_ACTIONS.STORE_APPOINTMENT:
            return action.payload;
        default:
            return state;
    }
}

const newAppointment = (state = [], action) => {
    switch (action.type) {
        case UNAVAILABLE_ACTIONS.NEW_APPOINTMENT:
            return [...state, action.payload];
        case UNAVAILABLE_ACTIONS.RESET_NEW_APPOINTMENT:
            return [];
        default:
            return state;
    }
}

const unavailability = (state = [], action) => {
    switch (action.type) {
        case UNAVAILABLE_ACTIONS.STORE_UNAVAILABILITY:
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    appointment,
    newAppointment,
    unavailability,
});