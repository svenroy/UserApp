import React from 'react';
import {Redirect} from 'react-router-dom';
import authenticate from '../enhancements/authentication';

import {
    route as servicesRoute,
    view as ServicesView
} from '../features/clientapp/features/services';

import {
    route as profileRoute,
    view as ProfileView
} from '../features/clientapp/features/profile';

const routes = [
    {
        path: "/home",
        component: authenticate(() => <Redirect to={servicesRoute} />),
        exact: true,
    },
    {
        path: servicesRoute,
        component: authenticate(ServicesView)
    },
    {
        path: profileRoute,
        component: authenticate(ProfileView)
    }
];

export default routes;