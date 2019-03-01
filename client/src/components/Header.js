import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './assets/styles/header.css';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <Link className="logo" to="/">
          Logo
        </Link>
        <Link className="nav-link" to="/login">
          {this.props.auth.isAuthenticated?`Hi, ${this.props.auth.currentUser.name}`:'Login'}
        </Link>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
