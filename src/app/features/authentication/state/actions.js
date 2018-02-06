import * as types from './types';

import appConfig from "../../../../config/aws";
import AWS, {
    CognitoIdentityCredentials
} from "aws-sdk";

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

import constants from '../../../../config/constants';

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId,
});

const loginSuccessful = () => ({
    type: types.LOGIN_SUCCESS,
    when: Date.now()
});

const loginFailure = () => ({
    type: types.LOGIN_FAILURE,
    when: Date.now()
});

const validSession = role => ({
    type: types.SESSION_VALID,
    role
});

export const login = (email, password) => (dispatch, getState) => {   
    dispatch({ type: types.LOGIN_REQUESTED });

    var authenticationData = {
        Username : email,
        Password : password,
    };

    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userData = {
        Username : email,
        Pool : userPool
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {     
            console.log(result);     
            AWS.config.region = appConfig.region;

            const tokenKey = `cognito-idp.${appConfig.region}.amazonaws.com/${appConfig.UserPoolId}`;

            AWS.config.credentials = new CognitoIdentityCredentials({
                IdentityPoolId : appConfig.IdentityPoolId,
                Logins : {
                    [tokenKey] : result.getIdToken().getJwtToken()
                }
            });

            console.log(AWS.config.credentials);

            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.log(error);
                    dispatch(loginFailure());
                } else {
                    dispatch(loginSuccessful());
                    dispatch(checkUserSession());
                }
            });
        },

        onFailure: (err) => {
            alert(err);
            dispatch(loginFailure());
        },
    });
};

export const checkUserSession = () => (dispatch, getState, {httpVerbs, apiEndPoint}) => {
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
            if (err) {
                return;
            }
            
            cognitoUser.getUserAttributes((err, result) => {
                if (err) {
                    return;
                }
                var attr = result.find(d => d.getName() === constants.awsUserAttributes.role);

                if(attr){
                    global.utils.setUserToken(session.getIdToken().getJwtToken());
                    dispatch(loginSuccessful());
                    dispatch(validSession(attr.getValue()));                    
                }
            });
        });
    }
}

export const signOut = () => {
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.signOut();
        AWS.config.credentials.clearCachedId();
        global.utils.deleteAuthData();
        
        window.location.href = "/";
    }
};