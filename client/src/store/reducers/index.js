import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import message from './message';
import books from './books';
import search from './search';

export default combineReducers({
   auth,
   error,
   message,
   books,
   search,
});
