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
            dispatch(saveUserSession());
        },
        onFailure: (err) => {
            alert(err);
            dispatch(loginFailure());
        },
    });
};

export const saveUserSession = () => (dispatch, getState, {httpVerbs, apiEndPoint}) => {
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
                    global.utils.setUserId(session.accessToken.payload.sub);
                    global.utils.setUserRole(attr.getValue());
                    
                    dispatch(loginSuccessful());                    
                }
            });
        });
    }
}

export const signOut = () => {
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.signOut();
        global.utils.deleteAuthData();        
        window.location.href = "/";
    }
};