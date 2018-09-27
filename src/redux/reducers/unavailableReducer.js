import { combineReducers } from 'redux';
import { UNAVAILABLE_ACTIONS } from '../actions/unavailableActions';

// const availability = (state = [], action) => {
//     switch (action.type) {
//         case AVAILABLE_ACTIONS.STORE_AVAILABILITY:
//             return action.payload;
//         default:
//             return state;
//     }
// }

// const newAvailability = (state = [], action) => {
//     switch (action.type) {
//         case AVAILABLE_ACTIONS.NEW_AVAILABILITY:
//             return [...state, action.payload];
//         case AVAILABLE_ACTIONS.RESET_NEW_AVAILABILITY:
//             return [];
//         default:
//             return state;
//     }
// }

const unavailability = (state = [], action) => {
    switch (action.type) {
        case UNAVAILABLE_ACTIONS.STORE_UNAVAILABILITY:
            return action.payload;
        default:
            return state;
    }
}

const estimate = (state = {duration: 0}, action) => {
    switch (action.type) {
        case UNAVAILABLE_ACTIONS.FETCH_ESTIMATE_DURATION:
            return {...state, duration: action.payload};
        default:
            return state;
    }
}

export default combineReducers({
    // availability,
    // newAvailability,
    unavailability,
    estimate,
});