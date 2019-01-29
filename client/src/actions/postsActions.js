import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';

export const getPosts = userId => dispatch => {
  axios.get('/api/posts')
  .then( posts => dispatch({type: GET_POSTS, payload: posts.data[0]})
   )
   .catch(err=>dispatch({type: GET_POSTS, payload: null}));
}