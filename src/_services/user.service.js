import {authHeader} from '../_helpers';
import {apisConstants} from "../_constants";

export const userService = {
    getUser
};

function getUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(process.env.REACT_APP_API_ENDPOINT + process.env.REACT_APP_API_VERSION_V1 + apisConstants.USER_URL, requestOptions)
        .then(handleResponse)
        .then(users => {
            if (users) {
                localStorage.setItem('userData', JSON.stringify(users));
            }

            return users;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}