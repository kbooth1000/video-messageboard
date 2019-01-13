import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk;'

import Main from './components/Main';

import './index.css';
import './app.css';

const middleware = [thunk];

const store = createStore(()=>[], {}, applyMiddleware(...middleware));

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
