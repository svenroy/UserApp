import * as types from './types';

export const loadUserServices = () => (dispatch, getState, { httpVerbs, apiEndPoint }) => {
    dispatch({
        type: types.LOAD_USERSERVICES_REQUESTED
    });

    dispatch({
        type: httpVerbs.GET,
        url: `${apiEndPoint}/values`,
        success: response => {
            console.log(response);
        },
        failure: response => { }
    });
};