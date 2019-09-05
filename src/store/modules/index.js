import { combineReducers } from 'redux';
import blog from './blog';
import employee from './employee';

export default combineReducers({
  blog, employee
});