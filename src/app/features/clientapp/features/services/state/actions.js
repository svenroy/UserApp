import * as types from './types';
import uuidv4 from 'uuid/v4';

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
        failure: response => {
            dispatch({
                type: types.LOAD_CLIENT_SERVICES_FAILURE,
                services: response
            })
        }
    });
};

export const addClientService = (name, key, defaultValue) => (dispatch, getState, {httpVerbs, apiEndPoint}) => {
    dispatch({
        type: types.ADD_CLIENT_SERVICE_REQUESTED
    });

    dispatch({
        type: httpVerbs.POST,
        url: `${apiEndPoint}/clientservices`,
        body: { id: uuidv4(), name, key, defaultValue },
        success: response => {
            dispatch({
                type: types.ADD_CLIENT_SERVICE_SUCCESS
            });

            dispatch(loadClientServices());
        },
        failure: response => { }
    });
};