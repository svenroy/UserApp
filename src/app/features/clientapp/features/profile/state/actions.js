import * as types from './types';

export const saveProfile = (name) => (dispatch, getState, {httpVerbs, apiEndPoint}) => {
    dispatch({
        type: types.CLIENT_APP_PROFILE_SAVE_PROFILE_REQUESTED
    }); 
    
    dispatch({
        type: httpVerbs.POST,
        url: `${apiEndPoint}/clientprofiles`,
        body: {name},
        success: response => {
            dispatch({
                type: types.CLIENT_APP_PROFILE_SAVE_PROFILE_SUCCESS
            });
            dispatch(loadProfile());
        },
        failure: response => {
            dispatch({
                type: types.CLIENT_APP_PROFILE_SAVE_PROFILE_FAILURE
            });
        }
    });
}

export const loadProfile = () => (dispatch, getState, {httpVerbs, apiEndPoint}) => {
    dispatch({
        type: types.CLIENT_APP_PROFILE_LOAD_PROFILE_REQUESTED
    });

    dispatch({
        type: httpVerbs.GET,
        url: `${apiEndPoint}/clientprofiles`,
        success: response => {
            if(response.status === 200) {
                dispatch({
                    type: types.CLIENT_APP_PROFILE_LOAD_PROFILE_SUCCESS,
                    payload: response.payload
                });
            } else {
                dispatch({
                    type: types.CLIENT_APP_PROFILE_LOAD_PROFILE_FAILURE
                });
            } 
        },
        failure: response => {
            dispatch({
                type: types.CLIENT_APP_PROFILE_LOAD_PROFILE_FAILURE
            });
        }
    });
}