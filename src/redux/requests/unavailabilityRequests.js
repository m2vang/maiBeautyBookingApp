import axios from 'axios';

// export function fetchAvailability() {
//     return axios.get('/api/availability')
//         .then(response => response.data)
//         .catch(error => {
//             alert("Error fetching availability");
//             throw error.reponse || error;
//         });
// }
export function fetchUnavailability() {
    return axios.get('/api/unavailability')
        .then(response => response.data)
        .catch(error => {
            alert("Error fetching unavailability");
            console.log(error);
            throw error.response || error;
        });
}

export function postUnavailability(unavailabilityStore) {
    return axios.post('/api/unavailability', unavailabilityStore)
        .then(response => response)
        .catch(error => {
            alert('Error posting unavailability');
            throw error.response || error;
        });
}

export function removeAvailability(payload) {
    return axios.delete(`/api/unavailability/${payload}`)
        .then(response => response)
        .catch(error => {
            alert('Error removing availability.');
            throw error.response || error;
        });
}

