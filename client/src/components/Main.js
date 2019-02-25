import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import ThreadsList from './ThreadsList';
import NewThreadButton from './NewThreadButton';
import Register from './auth/Register';
import Login from './auth/Login';
import Footer from './Footer';
import VideoRecorder from './DualScreenRecorder'; 

import './assets/styles/main.css';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Header />
        <VideoRecorder  />VideoRecorder
        <main className="main-content">
          <Route path="/" exact component={Landing} />
          <Route path="/threads" exact component={ThreadsList} />
          <Route path="/register" exact component={Register} /> 
          <Route path="/login" exact component={Login} /> 
        </main>
        <NewThreadButton />
        <Footer />
      </div>
    );
  }
}

export default Main;
