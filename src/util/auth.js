import guard from './guard';

const AuthIdTokenKey = 'authIdToken';
const AuthUserNameKey = 'authUserName';
const AuthAccessTokenKey = 'authAccessToken';

const getAuthData = () => {
    return {
        idToken: global.sessionStorage.getItem(AuthIdTokenKey),
        userName: global.sessionStorage.getItem(AuthUserNameKey),
        accessToken: global.sessionStorage.getItem(AuthAccessTokenKey)
    };
};

export const setAuthData = (idToken, username, accessToken) => {
    guard(idToken, "idToken");
    guard(username, "userName");
    guard(accessToken, "accessToken");

    global.sessionStorage.setItem(AuthIdTokenKey, idToken);
    global.sessionStorage.setItem(AuthUserNameKey, username);
    global.sessionStorage.setItem(AuthAccessTokenKey, accessToken);
};

export const deleteAuthData = () => {
    global.sessionStorage.removeItem(AuthIdTokenKey);
    global.sessionStorage.removeItem(AuthUserNameKey);
    global.sessionStorage.removeItem(AuthAccessTokenKey);
};

export const isAuthenticated = () => {
    return !!getAuthData().accessToken;
};

export const getUsername = () => {
    return getAuthData().userName;
};

/*export const getUserId = () => {
    return getAuthData().userId;
};*/

export const getAuthHeaders = () => {
    let token = getAuthData().userToken;
    let headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
};

global.utils = {
    ...global.utils,
    setAuthData,
    deleteAuthData,
    isAuthenticated,
    //getUserId,
    getUsername
};