import { combineReducers } from 'redux';
import createLoginReducer from '../features/authentication';
import createSignUpReducer from '../features/signup';
import createClientDashboardReducer from '../features/clientapp/features/services';
import createUserDashboardReducer from '../features/user-dashboard';

export default function createReducer() {
    return combineReducers({
        authentication: createLoginReducer(),
        registration: createSignUpReducer(),
        clientDashboard: createClientDashboardReducer(),
        userDashboard: createUserDashboardReducer()
    });
};