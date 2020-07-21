/*import config from 'config';*/

export const loginService = {
    login,
    logout
};

function login(username, password) {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    form.append("grant_type", "password");

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from("zodi-client:zodi-client-oho").toString('base64')
        },
        body: form
    };

    return fetch(process.env.REACT_APP_API_ENDPOINT + process.env.REACT_APP_API_VERSION_V1 + `/oauth/token`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
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