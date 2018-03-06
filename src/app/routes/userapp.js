import React from 'react';
import {Redirect} from 'react-router-dom';
import authenticate from '../enhancements/authentication';

import {view as Subscriptions, Subscribe} from '../features/userapp/features/subscriptions';
import {view as Dashboard} from '../features/userapp/features/dashboard';

const routes = [
    {
        path: "/home",
        component: authenticate(() => <Dashboard />),
        exact: true,
    },
    {
        path: "/subscriptions",
        component: authenticate(() => <Subscriptions />),
        exact: true
    },
    {
        path: "/subscribe/:id",
        render: (props) => {
            const View = authenticate(() => <Subscribe {...props} />);
            return <View />;
        }
    }
];

export default routes;