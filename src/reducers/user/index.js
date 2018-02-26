import { combineReducers } from 'redux';

import recording from './recording';
import logging from './logging';
import checkingAuth from './checkingAuth';
import checkingLogin from './checkingLogin';
import data from './data';

export default combineReducers({
  recording,
  logging,
  checkingAuth,
  checkingLogin,
  data,
});
