import { createSelector } from 'reselect';

const getDuckState = (state, props) => {
    return state.authentication;
};

export const getUserAuthenticated = createSelector(
    [getDuckState],
    (authentication) => global.utils.isAuthenticated()
);