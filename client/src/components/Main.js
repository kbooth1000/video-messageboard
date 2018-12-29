import React, { Component } from 'react';

import Header from './Header';
import ThreadsList from './ThreadsList';
import NewThreadButton from './NewThreadButton';
import Footer from './Footer';

import './main.css';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Header />
        
        <main className="main-content">
          <ThreadsList />
        </main>

        <NewThreadButton />
        <Footer />
      </div>
    );
  }
}

export default Main;
