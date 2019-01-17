import { GET_ERRORS } from '../actions/authActions';

const initialState = {}

const errorReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_ERRORS:
      return {
        errors: action.payload
      }
    default: return state;
  }
}

export default errorReducer;