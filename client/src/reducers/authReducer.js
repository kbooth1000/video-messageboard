import { GET_CURRENT_USER, REGISTER_USER } from '../actions/authActions';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  currentUser: {}
}

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case REGISTER_USER:
      return {
        ...state, user: action.payload
      }
      //
    case GET_CURRENT_USER:
      return {
        ...state, 
         currentUser: action.payload,
         isAuthenticated: !isEmpty(action.payload)
      }
    default: return state;
  }
}

export default authReducer;