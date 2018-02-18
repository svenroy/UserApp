import { createSelector } from 'reselect';

const getDuckState = (state, props) => {
    return state.authentication;
};

export const getUserAuthenticated = () => global.utils.validSession();

export const getUserRole = () => global.utils.getUserRole();