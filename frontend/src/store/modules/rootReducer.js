import { combineReducers } from 'redux';

import auth from './auth/reducer';
import filter from './filter/reducer';
import modal from './modal/reducer';

export default combineReducers({
  auth,
  filter,
  modal,
});
