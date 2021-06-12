import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles.scss';
import { checkUserIsAdmin } from '../../utils';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const AdminToolBar = props => {
  const { currentUser } = useSelector(mapState);

  if (!checkUserIsAdmin(currentUser)) return null;

  return (
    <div className="adminToolBar">
      <ul>
        <li>
          <Link to='/admin'>
            Admin Console
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminToolBar;
