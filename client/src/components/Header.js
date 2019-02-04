import React from 'react';
import {Link} from 'react-router-dom';

import './assets/styles/header.css';

const Header = () => {
  return (
    <header className="Header">
      <Link className="logo" to="/">Logo</Link>
      <Link className="nav-link" to="/login">Login</Link>
    </header>
  )
}

export default Header;