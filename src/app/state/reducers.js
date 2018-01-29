import { combineReducers } from 'redux';
import createLoginReducer from '../features/login';
import createSignUpReducer from '../features/signup';

export default function createReducer() {
    return combineReducers({
        authentication: createLoginReducer(),
        registration: createSignUpReducer(),
    });
};