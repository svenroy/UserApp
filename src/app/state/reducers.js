import { combineReducers } from 'redux';
import createLoginReducer from '../features/login';

export default function createReducer() {
    return combineReducers({
        authentication: createLoginReducer()
    });
};