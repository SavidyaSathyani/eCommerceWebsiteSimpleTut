import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import { signOutUserStart } from '../../redux/User/user.actions';
import { Link } from 'react-router-dom';

// assets
import LOGO from '../../assets/logo.png';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = props => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const handleSignOut = () => {
    dispatch(signOutUserStart());
  };

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
                <Link to="/dashboard">
                  My Account
                </Link>
              </li>
              <li>
                <span onClick={handleSignOut}>
                  Logout
                </span>
              </li>
            </ul>)
          }
        </div>
      </div>
    </header>
  )
};

export default Header;
