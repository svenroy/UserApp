import { combineReducers } from 'redux';
import createLoginReducer from '../features/authentication';
import createSignUpReducer from '../features/signup';
import createClientDashboardReducer from '../features/client-dashboard';

export default function createReducer() {
    return combineReducers({
        authentication: createLoginReducer(),
        registration: createSignUpReducer(),
        clientDashboard: createClientDashboardReducer(),
    });
};