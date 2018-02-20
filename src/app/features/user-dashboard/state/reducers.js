import * as types from './types';

const defaultState = {
    addService: null
};

export default () => (state = defaultState, action = {}) => {
    switch (action.type) {
        case types.GET_CLIENT_SERVICE_SUCCESS:
            return {...state, addService: action.service};

        default:
            return state;
    }
};