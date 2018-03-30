import React from 'react';
import authenticate from '../enhancements/authentication';

import {view as Subscriptions, Subscribe} from '../features/userapp/features/subscriptions';
import {view as Dashboard} from '../features/userapp/features/dashboard';

const routes = [
    {
        path: "/home",
        component: authenticate(Dashboard),
        exact: true,
    },
    {
        path: "/subscriptions",
        component: authenticate(Subscriptions),
        exact: true
    },
    {
        path: "/subscribe/:id",
        render: (props) => authenticate(Subscribe)(props)
    }
];

export default routes;