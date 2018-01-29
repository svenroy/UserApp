import createReducer, { selectors } from './state';
import view from './view';

const route = '/signup';
export {
    view,
    route,
    selectors
};

export default createReducer;