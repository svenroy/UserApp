import * as types from './types';

export const getUserServices = () => (dispatch, getState, { httpVerbs, apiEndPoint }) => {
    dispatch({
        type: types.GET_USER_SERVICES_REQUESTED
    });

    dispatch({
        type: httpVerbs.GET,
        url: `${apiEndPoint}/usersubscriptions`,
        success: response => {
            if(response.status === 200) {
                dispatch({
                    type: types.GET_USER_SERVICES_SUCCESS,
                    subscriptions: response.payload.subscriptions
                });
            } else {
                dispatch({
                    type: types.GET_USER_SERVICES_FAILURE
                });
            }            
        },
        failure: response => {
            dispatch({
                type: types.GET_USER_SERVICES_FAILURE
            });
        }
    });
};

export const getClientProfileAndServices = (id) => (dispatch, getState, { httpVerbs, apiEndPoint }) => {    
    dispatch({ type: types.GET_CLIENT_PROFILE_AND_SERVICES_REQUESTED });

    dispatch({
        type: httpVerbs.GET,
        url: `${apiEndPoint}/usersubscriptions/getClientAndServices/${id}`,
        success: response => {
            if(response.status === 200) {
                dispatch({
                    type: types.GET_CLIENT_PROFILE_AND_SERVICES_SUCCESS,
                    profile: response.payload.profile,
                    services: response.payload.services
                });
            } else {
                dispatch({ type: types.GET_CLIENT_PROFILE_AND_SERVICES_FAILURE });
            }            
        },
        failure: response => {
            dispatch({ type: types.GET_CLIENT_PROFILE_AND_SERVICES_FAILURE });
        }
    });
};

export const subscribe = (id, services, next) => (dispatch, getState, { httpVerbs, apiEndPoint }) => {
    dispatch({
        type: httpVerbs.POST,
        url: `${apiEndPoint}/usersubscriptions`,
        body: {
            clientId: id,
            clientServiceIds: services
        },
        success: response => {
            if(response.status === 201) {
                dispatch({
                    type: types.SUBSCRIBE_SUCCESS,
                });
                dispatch(getUserServices());
                next();
            } else {
                dispatch({ type: types.SUBSCRIBE_FAILURE });
            }            
        },
        failure: response => {
            dispatch({ type: types.SUBSCRIBE_FAILURE });
        }
    });
};

export const subscribeSingle = (serviceId) => (dispatch, getState, { httpVerbs, apiEndPoint }) => {
    dispatch({
        type: httpVerbs.POST,
        url: `${apiEndPoint}/usersubscriptions/subscribe`,
        body: serviceId,
        success: response => {
            if(response.status === 201) {
                dispatch(getUserServices());
            }           
        },
        failure: response => {
        }
    });
};

export const unsubscribeSingle = (serviceId) => (dispatch, getState, { httpVerbs, apiEndPoint }) => {
    dispatch({
        type: httpVerbs.POST,
        url: `${apiEndPoint}/usersubscriptions/unsubscribe`,
        body: serviceId,
        success: response => {
            if(response.status === 201) {
                dispatch(getUserServices());
            }             
        },
        failure: response => {
        }
    });
};