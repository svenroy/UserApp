import * as types from './types';

export const loadClientServices = () => (dispatch, getState, {httpVerbs, apiEndPoint}) => {
    dispatch({
        type: types.LOAD_CLIENT_SERVICES_REQUESTED
    });

    dispatch({
        type: httpVerbs.GET,
        url: `${apiEndPoint}/clientservices`,
        success: response => {
            dispatch({
                type: types.LOAD_CLIENT_SERVICES_SUCCESS,
                services: response
            })
        },
        failure: response => { }
    });
};