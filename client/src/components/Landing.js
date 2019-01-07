import React from 'react';
import {Link} from 'react-router-dom';

import './landing.css';

const Landing = () => {
  return (
    <div className="Landing">
      <Link className="nav-link" to="/login">Login</Link><br></br>
      <Link className="nav-link" to="/register">Register</Link>
    </div>
  )
}

export default Landing;