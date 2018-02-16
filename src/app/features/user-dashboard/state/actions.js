import * as types from './types';

/*const loadUserServicesSucceeded = () => {

};

const loadUserServicesFailed = () => {

};*/

export const loadUserServices = () => (dispatch, getState, { httpVerbs, apiEndPoint }) => {
    dispatch({
        type: types.LOAD_USERSERVICES_REQUESTED
    });

    dispatch({
        type: httpVerbs.GET,
        url: `${apiEndPoint}/values`,
        success: response => {
            //global.utils.setAuthData(email, response.payload.userToken, response.payload.userId);
            //dispatch(authenticationPassed());
            console.log(response);
        },
        failure: response => { }
    });
};