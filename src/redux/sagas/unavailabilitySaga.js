import { select, put, takeLatest } from 'redux-saga/effects';
import { UNAVAILABLE_ACTIONS } from '../actions/unavailableActions';
import { getUnavailability } from '../selectors/unavailabilitySelector';
import { fetchUnavailability, postUnavailability, removeAvailability } from '../requests/unavailabilityRequests';

function* fetch() {
    try {
        const unavailability = yield fetchUnavailability();
        yield put({ type: UNAVAILABLE_ACTIONS.STORE_UNAVAILABILITY, payload: unavailability });
    } catch (error) {
        alert("Failed to fetch unavailability");
    }
}

// function* getUn(action) {
//     try {
//         const unavailability = yield fetchUnavailability();
//         yield put({ type: UNAVAILABLE_ACTIONS.STORE_UNAVAILABILITY, payload: unavailability });
//     } catch (error) {
//         alert("Failed to fetch unavailability");
//     }
// }

function* post() {
    try {
        const unavailabilityStore = yield select(getUnavailability);
        console.log('posting in availability saga');
        yield postUnavailability(unavailabilityStore);
        yield put({ type: UNAVAILABLE_ACTIONS.RESET_NEW_AVAILABILITY });
        yield put({ type: UNAVAILABLE_ACTIONS.FETCH_UNAVAILABILITY });
    } catch (error) {
        alert("Failed to post availability");
    }
}

function* remove(action) {
    try {
        yield removeAvailability(action.payload);
        yield put({ type: UNAVAILABLE_ACTIONS.FETCH_UNAVAILABILITY });
    } catch (error) {
        alert("Failed to delete availability");
    }
}

function* availabilitySaga() {
    yield takeLatest(UNAVAILABLE_ACTIONS.FETCH_UNAVAILABILITY, fetch);
    yield takeLatest(UNAVAILABLE_ACTIONS.RESET_NEW_AVAILABILITY, post);
    yield takeLatest(UNAVAILABLE_ACTIONS.RESET_NEW_AVAILABILITY, remove);
    // yield takeLatest(UNAVAILABLE_ACTIONS.FETCH_UNAVAILABILITY, getUn);
}

export default availabilitySaga;