const UserTokenKey = "dashboard_user_token";

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

export const deleteAuthData = () => {
    global.sessionStorage.removeItem(UserTokenKey);
};

global.utils = {
    ...global.utils,
    setUserToken,
    deleteAuthData
};
