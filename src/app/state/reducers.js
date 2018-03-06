import { combineReducers } from 'redux';
import createLoginReducer from '../features/authentication';
import createSignUpReducer from '../features/signup';
import createClientDashboardReducer from '../features/clientapp/features/services';
import createUserSubscriptionsReducer from '../features/userapp/features/subscriptions';
import createClientAppProfileReducer from '../features/clientapp/features/profile';

export default function createReducer() {
    return combineReducers({
        authentication: createLoginReducer(),
        registration: createSignUpReducer(),
        clientDashboard: createClientDashboardReducer(),
        userSubscriptions: createUserSubscriptionsReducer(),
        clientProfile: createClientAppProfileReducer()
    });
};