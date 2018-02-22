import React from 'react';
import authenticated, {redirectIfAuthenticated} from '../enhancements/authentication';

import {
    route as loginRoute, 
    view as LoginView
} from '../features/authentication';

import {
    route as signupRoute,
    view as SignupView
} from '../features/signup';

import {Redirect} from 'react-router-dom';

const routes = [
    {
        path: "/",
        component: authenticated(() => <Redirect to="/home" />),
        exact: true,
    },
    {
        //login
        path: loginRoute,
        component: redirectIfAuthenticated(() => <LoginView />),
        exact: true,
    },
    {
        //signup
        path: signupRoute,
        component: redirectIfAuthenticated(() => <SignupView />),
        exact: true,
    }
];

export default routes;