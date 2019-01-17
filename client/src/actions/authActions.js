import axios from 'axios';

export const GET_ERRORS = 'GET_ERRORS';
export const REGISTER_USER = 'REGISTER_USER';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/auth/register', userData)
  .then( user => history.push('/login'))
  .catch( err => {
    dispatch({type: GET_ERRORS, payload: err.response.data})
  })
};

export const getCurrentUser = userData => dispatch => {
  axios.post('/api/auth/login', userData)
  .then(user => {
    console.log('user: ', user);
    
    dispatch({type: GET_CURRENT_USER, payload: user})
  }).catch( err => {
    dispatch({type: GET_ERRORS, payload: err.response.data})
  })
};
