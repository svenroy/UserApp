import * as types from './types';

const defaultState = {
    isLoading: false, 
    subscriptions: [],
    subscribeTo: null
};

export default () => (state = defaultState, action = {}) => {
    switch (action.type) {
        case types.GET_USER_SERVICES_REQUESTED:
            return {...state, isLoading: true};

        case types.GET_USER_SERVICES_SUCCESS:
            return {...state, subscriptions: action.subscriptions, isLoading: false};

        case types.GET_USER_SERVICES_FAILURE:
            return {...state, isLoading: false};

        case types.GET_CLIENT_PROFILE_AND_SERVICES_REQUESTED:
            return {...state, isLoading: true};

        case types.GET_CLIENT_PROFILE_AND_SERVICES_FAILURE:
            return {...state, isLoading: false};
        
        case types.GET_CLIENT_PROFILE_AND_SERVICES_SUCCESS:
            return {...state, 
                isLoading: false,
                subscribeTo:{
                    services: action.services,
                    client: action.profile
                }
            };

        default:
            return state;
    }
};