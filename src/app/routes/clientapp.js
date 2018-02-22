import React from 'react';
import {Redirect} from 'react-router-dom';
import authenticate from '../enhancements/authentication';

import {view as ServicesView} from '../features/clientapp/features/services';

const routes = [
    {
        path: "/",
        component: authenticate(() => <Redirect to="/services" />),
        exact: true,
    },
    {
        path: "/services",
        component: authenticate(() => <ServicesView />)
    }
];

export default routes;