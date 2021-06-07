import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

// assets
import LOGO from '../../assets/logo.png';

const Header = props => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={LOGO} alt="SimpleTut" />
          </Link>
        </div>

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/registration">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
};

export default Header;
