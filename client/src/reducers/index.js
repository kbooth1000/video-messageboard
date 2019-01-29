import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  errors: errorReducer
})