import * as types from './types';

import appConfig from "../../../../config/aws";
import { Config } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js";

Config.region = appConfig.region;

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});

export const signUp = (email, password, role) => (dispatch, getState) => {
    const attributeList = [
        new CognitoUserAttribute({
            Name: 'email',
            Value: email,
        }),
        new CognitoUserAttribute({
            Name: 'custom:role',
            Value: role,
        })
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
            dispatch({ type: types.REGISTER_USER_FAILURE });
            return;
        }
        dispatch({
            type: types.REGISTER_USER_SUCCESS,
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
            dispatch({type: types.REGISTER_CONFIRMATION_FAILURE});
            return;
        }
        dispatch({type: types.REGISTER_CONFIRMATION_SUCCESS});
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
    });
};