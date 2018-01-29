import { createSelector } from 'reselect';

const getDuckState = (state, props) => {
    return state.registration;
};

export const getRegistrationConfirmation = createSelector(
    [getDuckState],
    (registration) => registration.confirmed
);