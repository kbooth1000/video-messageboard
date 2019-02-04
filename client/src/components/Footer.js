import React from 'react';

import './assets/styles/footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      Copyright &copy; {new Date().getFullYear()}
    </footer>
  )
}

export default Footer;