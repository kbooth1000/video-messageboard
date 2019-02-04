import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux';
import jwtDecode from 'jwt-decode';
// import thunk from 'redux-thunk';
import setAuthToken from './utils/setAuthToken';

import {setCurrentUser} from './actions/authActions';
import Main from './components/Main';
import store from './store';
import './index.css';
import './app.css';

if(localStorage.jwt) {setAuthToken(localStorage.jwt)
const decodedUserInfo = jwtDecode(localStorage.jwt);
store.dispatch(setCurrentUser(decodedUserInfo))
} 

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Main />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
