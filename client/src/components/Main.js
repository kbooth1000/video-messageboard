import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import ThreadsList from './ThreadsList';
import NewThreadButton from './NewThreadButton';
import Footer from './Footer';
import Spinner from './Spinner';

import pic from './assets/pic.jpg';
import './main.css';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Header />
        
        <main className="main-content">
          <Route path="/" component={ThreadsList} />
          <Spinner />
        </main>

        <NewThreadButton />
        <Footer />
      </div>
    );
  }
}

export default Main;
