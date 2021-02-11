import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import loadingReducer from './loading.reducer';
import dimensionReducer from './dimension.reducer';

const rootReducer = combineReducers({
    userReducer,
    loadingReducer,
    dimensionReducer,
});

export default rootReducer;