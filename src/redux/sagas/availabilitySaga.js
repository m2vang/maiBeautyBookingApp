import { select, put, takeLatest } from 'redux-saga/effects';
import { AVAILABLE_ACTIONS } from '../actions/availableActions';
import { getAvailability } from '../selectors/availabilitySelector';
import { fetchAvailability, postAvailability, removeAvailability, fetchUnavailability } from '../requests/availabilityRequests';

function* fetch() {
    try {
        const availability = yield fetchAvailability();
        yield put({ type: AVAILABLE_ACTIONS.STORE_AVAILABILITY, payload: availability });
    } catch (error) {
        alert("Failed to fetch availability");
    }
}

function* getUn(action) {
    try {
        const unavailability = yield fetchUnavailability();
        yield put({ type: AVAILABLE_ACTIONS.STORE_UNAVAILABILITY, payload: unavailability });
    } catch (error) {
        alert("Failed to fetch unavailability");
    }
}

function* post() {
    try {
        const availabilityStore = yield select(getAvailability);
        console.log('posting in availability saga');
        yield postAvailability(availabilityStore);
        yield put({ type: AVAILABLE_ACTIONS.RESET_NEW_AVAILABILITY });
        yield put({ type: AVAILABLE_ACTIONS.FETCH_AVAILABILITY });
    } catch (error) {
        alert("Failed to post availability");
    }
}

function* remove(action) {
    try {
        yield removeAvailability(action.payload);
        yield put({ type: AVAILABLE_ACTIONS.FETCH_AVAILABILITY });
    } catch (error) {
        alert("Failed to delete availability");
    }
}

function* availabilitySaga() {
    yield takeLatest(AVAILABLE_ACTIONS.FETCH_AVAILABILITY, fetch);
    yield takeLatest(AVAILABLE_ACTIONS.RESET_NEW_AVAILABILITY, post);
    yield takeLatest(AVAILABLE_ACTIONS.RESET_NEW_AVAILABILITY, remove);
    yield takeLatest(AVAILABLE_ACTIONS.FETCH_UNAVAILABILITY, getUn);
}

export default availabilitySaga;