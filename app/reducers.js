import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
//import indexReducer from 'page/index/reducer';

export default combineReducers({
    router: routerStateReducer/*,
    app: indexReducer.reducer.bind(indexReducer)*/
});