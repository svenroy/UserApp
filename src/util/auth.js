import guard from './guard';

const AuthUserTokenKey = 'authUserToken';
const AuthUserNameKey = 'authUserName';
const AuthUserIDKey = 'authUserID';

const getAuthData = () => {
    return {
        userToken: global.sessionStorage.getItem(AuthUserTokenKey),
        userName: global.sessionStorage.getItem(AuthUserNameKey),
        userId: global.sessionStorage.getItem(AuthUserIDKey)
    };
};

export const setAuthData = (userName, userToken, userId) => {
    guard(userToken, "userToken");
    guard(userName, "userName");
    guard(userId, "userId");

    global.sessionStorage.setItem(AuthUserTokenKey, userToken);
    global.sessionStorage.setItem(AuthUserNameKey, userName);
    global.sessionStorage.setItem(AuthUserIDKey, userId);
};

export const deleteAuthData = () => {
    global.sessionStorage.removeItem(AuthUserTokenKey);
    global.sessionStorage.removeItem(AuthUserNameKey);
    global.sessionStorage.removeItem(AuthUserIDKey);
};

export const isAuthenticated = () => {
    return !!getAuthData().userToken;
};

export const getUsername = () => {
    return getAuthData().userName;
};

export const getUserId = () => {
    return getAuthData().userId;
};

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
    getUserId,
    getUsername
};