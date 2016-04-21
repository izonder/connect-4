import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import appReducer from 'page/app/reducer';

export default combineReducers({
    router: routerStateReducer,
    app: appReducer.reducer.bind(appReducer)
});