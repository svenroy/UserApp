import * as types from './types';

const defaultState = {
    services:[]
};

export default () => (state = defaultState, action = {}) => {
    switch (action.type) {
        case types.LOAD_CLIENT_SERVICES_SUCCESS:
            return {...state, services: action.services};

        default:
            return state;
    }
};