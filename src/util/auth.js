const UserTokenKey = "dashboard_user_token";
const UserIdKey = "dashboard_user_id";

export const getAuthHeaders = () => {
    let token = global.sessionStorage.getItem(UserTokenKey);
    let headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }    
    return headers;
};

export const setUserToken = userToken => {
    global.sessionStorage.setItem(UserTokenKey, userToken);
};

export const setUserId = userId => {
    global.sessionStorage.setItem(UserIdKey, userId);
};

export const getUserId = () => {
    return global.sessionStorage.getItem(UserIdKey)
};

export const deleteAuthData = () => {
    global.sessionStorage.removeItem(UserTokenKey);
};

global.utils = {
    ...global.utils,
    setUserToken,
    setUserId,
    getUserId,
    deleteAuthData
};
