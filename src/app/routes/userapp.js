import React from 'react';
import {Redirect} from 'react-router-dom';
import authenticate from '../enhancements/authentication';

import {view as ServicesView} from '../features/userapp/features/services';

const routes = [
    {
        path: "/home",
        component: authenticate(() => <Redirect to="/services" />),
        exact: true,
    },
    {
        path: "/services",
        component: authenticate(() => <ServicesView />)
    }
];

export default routes;