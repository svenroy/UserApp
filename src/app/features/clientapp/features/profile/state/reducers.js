import * as types from './types';

const defaultState = {
    profile: {
        name: ""
    }
};

export default () => (state = defaultState, action = {}) => {
    switch (action.type) {
        case types.CLIENT_APP_PROFILE_LOAD_PROFILE_SUCCESS:
            return {
                ...state, 
                profile:{
                    name: action.payload.name
                }
            };
        default:
            return state;
    }
};