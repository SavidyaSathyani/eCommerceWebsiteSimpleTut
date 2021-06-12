import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = props => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }

    // eslint-disable-next-line
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
