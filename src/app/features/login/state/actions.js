import * as types from './types';

const loginSuccessful = () => ({
    type: types.LOGIN_SUCCESS,
    when: Date.now()
});

const loginFailure = () => ({
    type: types.LOGIN_FAILURE,
    when: Date.now()
});

export const login = (email, password) => (dispatch, getState, { httpVerbs, apiEndPoint }) => {
    dispatch({
        type: httpVerbs.POST,
        url: `${apiEndPoint}/login`,
        body: { userId: "random_string", email, password },
        success: response => {
            dispatch(loginSuccessful());
        },
        failure: response => {
            dispatch(loginFailure());
        }
    });
};