import { combineReducers } from 'redux';
import { AVAILABLE_ACTIONS } from '../actions/availableActions';

const availablility = (state = [], action) => {
    switch (action.type) {
        case AVAILABLE_ACTIONS.STORE_AVAILABILITY:
            return action.payload;
        default:
            return state;
    }
}

const newAvailability = (state = [], action) => {
    switch (action.type) {
        case AVAILABLE_ACTIONS.NEW_AVAILABILITY:
            return [...state, action.payload];
        case AVAILABLE_ACTIONS.RESET_NEW_AVAILABILITY:
            return [];
        default:
            return state;
    }
}

const unavailability = (state = [], action) => {
    switch (action.type) {
        case AVAILABLE_ACTIONS.STORE_UNAVAILABILITY:
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    availablility,
    newAvailability,
    unavailability,
});