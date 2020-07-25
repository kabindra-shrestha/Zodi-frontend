import {loginConstants} from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? {loggedIn: true, user} : {},
    loginStatus: false,
    loginMessage: ''
};

export function login(state = initialState, action) {
    switch (action.type) {
        case loginConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case loginConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                loginStatus: true,
                loginMessage: "Logging Successful.",
                user: action.user
            };
        case loginConstants.LOGIN_FAILURE:
            return {
                loginStatus: false,
                loginMessage: action.error,
            };
        case loginConstants.LOGOUT:
            return {};
        default:
            return state
    }
}