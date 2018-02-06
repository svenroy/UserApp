
import * as types from './types';

const defaultState = {
    attemptedLogin: false,
    loginSucceeded: false,
    validUserSession: false,
    user: {}
};

export default () => (state = defaultState, action = {}) => {

    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {...state, loginSucceeded: true, attemptedLogin: true};

        case types.LOGIN_FAILURE:
            return {...state, loginSucceeded: false, attemptedLogin: true};

        case types.SESSION_VALID:
            return {...state, 
                validUserSession: true, 
                user: { role: action.role }
            };

        case types.SIGNOUT_SUCCESS:
            return defaultState;
            
        default:
            return state;
    }
};