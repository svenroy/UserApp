import * as types from './types';

import appConfig from "../../../../config/aws";
import AWS, {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

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

export const login = (email, password) => (dispatch, getState) => {

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
            console.log('access token + ' + result.getAccessToken().getJwtToken());            
            AWS.config.region = appConfig.region;

            const token = `cognito-idp.${appConfig.region}.amazonaws.com/${appConfig.UserPoolId}`;

            Config.credentials = new CognitoIdentityCredentials({
                IdentityPoolId : appConfig.IdentityPoolId,
                Logins : {
                    [token] : result.getIdToken().getJwtToken()
                }
            });
            
            Config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                    dispatch(loginFailure());
                } else {
                    global.utils.setAuthData(result.getIdToken().getJwtToken(), email, result.getAccessToken().getJwtToken());
                    dispatch(loginSuccessful());
                }
            });
        },

        onFailure: (err) => {
            alert(err);
            dispatch(loginFailure());
        },
    });
};