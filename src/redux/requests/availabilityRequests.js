import axios from 'axios';

export function fetchAvailability() {
    return axios.get('/api/availability')
        .then(response => response.data)
        .catch(error => {
            alert("Error fetching availability");
            throw error.reponse || error;
        });
}

export function postAvailability(availabilityStore) {
    return axios.post('/api/availability', availabilityStore)
        .then(response => response)
        .catch(error => {
            alert('Error posting availability');
            throw error.response || error;
        });
}

export function removeAvailability(payload) {
    return axios.delete(`/api/availability/${payload}`)
        .then(response => response)
        .catch(error => {
            alert('Error removing availability.');
            throw error.response || error;
        });
}

export function fetchUnavailability() {
    return axios.get('/api/availability/unavailable')
        .then(response => response.data)
        .catch(error => {
            alert("Error fetching unavailability");
            console.log(error);
            throw error.response || error;
        });
}