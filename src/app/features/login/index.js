import createReducer, { selectors } from './state';
import view from './view';

const route = '/login';
export {
    view,
    route,
    selectors
};

export default createReducer;