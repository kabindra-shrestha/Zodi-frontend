import {userVerificationIdDeleteConstants} from '../_constants';

const initialState = {
    fetching: false,
    userVerificationIdDeleteStatus: false,
    userVerificationIdDeleteMessage: ''
};

export function userVerificationIdDelete(state = initialState, action) {
    switch (action.type) {
        case userVerificationIdDeleteConstants.USER_VERIFICATION_ID_DELETE_REQUEST:
            return {
                fetching: true,
            };
        case userVerificationIdDeleteConstants.USER_VERIFICATION_ID_DELETE_SUCCESS:
            return {
                userVerificationIdDeleteStatus: true,
                userVerificationIdDeleteMessage: action.userVerificationIdDelete.message,
            };
        case userVerificationIdDeleteConstants.USER_VERIFICATION_ID_DELETE_FAILURE:
            return {
                userVerificationIdDeleteStatus: false,
                userVerificationIdDeleteMessage: action.error,
            };
        case userVerificationIdDeleteConstants.LOGOUT:
            return {};
        default:
            return state
    }
}