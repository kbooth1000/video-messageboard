import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const GET_ERRORS = 'GET_ERRORS';
export const REGISTER_USER = 'REGISTER_USER';
export const USER_LOGIN = 'USER_LOGIN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/auth/register', userData)
    .then(user => {
      dispatch({ type: REGISTER_USER, payload: user.data });
      history.push('/login?msg=regSuccess');
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const setCurrentUser = (decodedUserInfo) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedUserInfo
  }
}

// getting a bearer token back from router because 
// backend using jwt, which takes in user info and
// returns a token
export const userLogin = userData => dispatch => {
  axios
    .post('/api/auth/login', userData)
    .then(user => {
      console.log('user: ', user);

      dispatch({ type: USER_LOGIN, payload: user.data.token });
      localStorage.setItem('jwt', user.data.token);
      setAuthToken(user.data.token);

      // use jwt-decode to extract user info from the jwt token we're getting
      const decodedUserInfo = jwtDecode(user.data.token);
      dispatch(setCurrentUser(decodedUserInfo, dispatch));
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};


