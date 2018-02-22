import { combineReducers } from 'redux';
import createLoginReducer from '../features/authentication';
import createSignUpReducer from '../features/signup';
import createClientDashboardReducer from '../features/clientapp/features/services';
import createUserDashboardReducer from '../features/userapp/features/services';

export default function createReducer() {
    return combineReducers({
        authentication: createLoginReducer(),
        registration: createSignUpReducer(),
        clientDashboard: createClientDashboardReducer(),
        userDashboard: createUserDashboardReducer()
    });
};