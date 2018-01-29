import * as types from './types';

const defaultState = {
    signedUp: false,    
    attemptedSignUp: false,

    confirmed: false,
    attemptedConfirmation: false,
};

export default () => (state = defaultState, action = {}) => {
    switch (action.type) {
        case types.REGISTER_SUCCESSFUL:
            return {...state, signedUp: true, attemptedSignUp: true, username: action.username};

        case types.REGISTER_UNSUCCESSFUL:
            return {...state, signedUp: false, attemptedSignUp: true};

        case types.REGISTER_CONFIRMATION_SUCCESS:
            return {...state, confirmed: true, attemptedConfirmation: true};

        case types.REGISTER_CONFIRMATION_FAILURE:
            return {...state, confirmed: false, attemptedConfirmation: true};

        default:
            return state;
    }
};