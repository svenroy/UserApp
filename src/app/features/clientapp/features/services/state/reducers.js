import * as types from './types';

const defaultState = {
    isLoading: false,
    services:[]
};

export default () => (state = defaultState, action = {}) => {
    switch (action.type) {
        case types.LOAD_CLIENT_SERVICES_REQUESTED:
        case types.ADD_CLIENT_SERVICE_REQUESTED:
            return {...state, isLoading: true};

        case types.LOAD_CLIENT_SERVICES_SUCCESS:
            return {...state, services: action.services, isLoading: false};

        case types.LOAD_CLIENT_SERVICES_FAILURE:
        case types.ADD_CLIENT_SERVICE_SUCCESS:
            return {...state, isLoading: false};

        default:
            return state;
    }
};