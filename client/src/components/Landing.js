import React from 'react';
import {Link} from 'react-router-dom';

import './header.css';

const Landing = () => {
  return (
    <header className="Landing">
      <Link className="nav-link" to="/login">Login</Link><br></br>
      <Link className="nav-link" to="/register">Register</Link>
    </header>
  )
}

export default Landing;