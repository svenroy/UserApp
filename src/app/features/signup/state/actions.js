import * as types from './types';

import appConfig from "../../../../config/aws";
import { Config } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js";

Config.region = appConfig.region;
/*Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
});*/

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});

export const signUp = (email, password) => (dispatch, getState) => {
    const attributeList = [
        new CognitoUserAttribute({
            Name: 'email',
            Value: email,
        })
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
            dispatch({
                type: types.REGISTER_UNSUCCESSFUL
            });
            return;
        }

        dispatch({
            type: types.REGISTER_SUCCESSFUL,
            username: result.user.getUsername()
        });
    });
};

export const confirm = (email, confirmationCode) => (dispatch, getState) => {

    let userData = {
        Username : email,
        Pool : userPool
    };

    let cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
            alert(err);            

            dispatch({
                type: types.REGISTER_CONFIRMATION_FAILURE
            });
            return;
        }

        dispatch({
            type: types.REGISTER_CONFIRMATION_SUCCESS
        });
        
        console.log('call result: ' + result);
    });
};

export const resendConfirmation = (email) => (dispatch, getState) => {
    let userData = {
        Username : email,
        Pool : userPool
    };

    let cognitoUser = new CognitoUser(userData);    
    cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
            alert(err);
            return;
        }
        console.log('call result: ' + result);
    });
};