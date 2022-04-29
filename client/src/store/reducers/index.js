import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
});
