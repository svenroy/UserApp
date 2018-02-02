import * as types from './types';

import appConfig from "../../../../config/aws";
import AWS, {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
  CognitoUserPool,
  //CognitoUserAttribute,
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

const validSession = () => ({
    type: types.SESSION_VALID
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

export const checkUserSession = () => (dispatch, getState) => {
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
            if (err) {
                return;
            }
            global.utils.setUserToken(session.getIdToken().getJwtToken());
            dispatch(validSession());
        });
    }
}

export const signOut = () => (dispatch, getState) => {
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.signOut();
        global.utils.deleteAuthData();
        
        dispatch({type: types.SIGNOUT_SUCCESS});
    }
};