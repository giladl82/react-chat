import { combineReducers } from 'redux';
import { reducer as user } from './user/reducer';
import { reducer as chat } from './chat/reducer';

export const reducers = combineReducers({
  user,
  chat
});
