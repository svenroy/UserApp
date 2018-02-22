import appConfig from "../config/aws";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const UserTokenKey = "dashboard_user_token";
const UserIdKey = "dashboard_user_id";
const UserRoleKey = "dashboard_user_role";

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

export const setUserRole = role => {
    global.sessionStorage.setItem(UserRoleKey, role);
};

export const getUserId = () => {
    return global.sessionStorage.getItem(UserIdKey)
};

export const getUserRole = () => {
    return global.sessionStorage.getItem(UserRoleKey)
};

export const validSession = () => {   
    const userPool = new CognitoUserPool({
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId,
    });

    return userPool.getCurrentUser() !== null &&
        getUserRole() !== null &&
        getUserId() !== null;
};

export const signOut = () => {
    const userPool = new CognitoUserPool({
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId,
    });

    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.signOut();
        deleteAuthData();        
        window.location.href = "/";
    }
};

const deleteAuthData = () => {
    global.sessionStorage.removeItem(UserTokenKey);
    global.sessionStorage.removeItem(UserIdKey);
    global.sessionStorage.removeItem(UserRoleKey);
};

global.utils = {
    ...global.utils,
    setUserToken,
    setUserId,
    setUserRole,
    getUserId,
    getUserRole,
    validSession,
    signOut
};
