import { createSelector } from 'reselect';

const getDuckState = (state, props) => {
    return state.authentication;
};

export const getUserAuthenticated = createSelector(
    [getDuckState],
    (authentication) => authentication.validUserSession
);

export const getUserRole = createSelector(
    [getDuckState],
    (authentication) => authentication.user.role
);