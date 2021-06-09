import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/utils';

// assets
import LOGO from '../../assets/logo.png';

const Header = props => {

  const {
    currentUser,
  } = props;

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={LOGO} alt="SimpleTut" />
          </Link>
        </div>

        <div className="callToActions">

          {!currentUser
            ? (<ul>
              <li>
                <Link to="/registration">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>
            </ul>)
            : (<ul>
              <li>
                <span onClick={() => auth.signOut()}>
                  LOGOUT
                </span>
              </li>
            </ul>)
          }
        </div>
      </div>
    </header>
  )
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps, null)(Header);
