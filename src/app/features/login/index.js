import createReducer, { selectors, actions } from './state';
import view from './view';

const route = '/login';
export {
    view,
    route,
    selectors, 
    actions
};

export default createReducer;