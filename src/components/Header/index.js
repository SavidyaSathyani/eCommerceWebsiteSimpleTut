import React from 'react';
import './styles.scss';
import LOGO from '../../assets/logo.png';

const Header = props => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <img src={LOGO} alt="SimpleTut" />
        </div>
      </div>
    </header>
  )
};

export default Header;
