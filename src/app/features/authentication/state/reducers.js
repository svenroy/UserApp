
import * as types from './types';

const defaultState = {
    attemptedLogin: false,
    loginSucceeded: false
};

export default () => (state = defaultState, action = {}) => {

    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {...state, loginSucceeded: true, attemptedLogin: true};

        case types.LOGIN_FAILURE:
            return {...state, loginSucceeded: false, attemptedLogin: true};
            
        default:
            return state;
    }
};