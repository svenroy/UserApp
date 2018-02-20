import * as types from './types';

export const getClientService = (id) => (dispatch, getState, { httpVerbs, apiEndPoint }) => {
    dispatch({
        type: types.GET_CLIENT_SERVICE_REQUESTED
    });

    dispatch({
        type: httpVerbs.GET,
        url: `${apiEndPoint}/clientservices/${id}`,
        success: response => {
            if(response.status === 200) {
                dispatch({
                    type: types.GET_CLIENT_SERVICE_SUCCESS,
                    service: response.payload
                });
            } else {
                dispatch({
                    type: types.GET_CLIENT_SERVICE_FAILURE
                });
            }            
        },
        failure: response => {
            dispatch({
                type: types.GET_CLIENT_SERVICE_FAILURE
            });
        }
    });
};

export const addExistingService = (clientServiceId) => (dispatch, getState, { httpVerbs, apiEndPoint }) => {
    dispatch({
        type: types.ADD_EXISTING_CLIENT_SERVICE_REQUESTED
    });

    dispatch({
        type: httpVerbs.POST,
        url: `${apiEndPoint}/userservices?clientServiceId`,
        body: clientServiceId,
        success: response => {
            dispatch({
                type: types.ADD_EXISTING_CLIENT_SERVICE_SUCCESS
            });           
        },
        failure: response => {
            dispatch({
                type: types.ADD_EXISTING_CLIENT_SERVICE_FAILURE
            });
        }
    });
};

export const addNewService = (name) => (dispatch, getState, { httpVerbs, apiEndPoint }) => {

};

