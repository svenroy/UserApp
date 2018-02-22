import React from 'react';
import {redirectIfAuthenticated} from '../enhancements/authentication';

import {
    route as loginRoute, 
    view as LoginView
} from '../features/authentication';

import {
    route as signupRoute,
    view as SignupView
} from '../features/signup';

const routes = [
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