import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import { signUpStart } from '../../redux/User/user.actions';
import FormInput from '../forms/FormInput'
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
  signUpErrors: user.userErrors,
  currentUser: user.currentUser,
});

const SignUp = props => {
  const {
    signUpErrors,
    currentUser,
  } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push('/');
    }

    // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(signUpErrors) && signUpErrors.length > 0) {
      setErrors(signUpErrors);
    }

  }, [signUpErrors]);

  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(signUpStart({
      displayName,
      email,
      password,
      confirmPassword,
    }));
  };

  const configAuthWarapper = {
    headline: 'Registration',
  };

  return (
    <AuthWrapper {...configAuthWarapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return (
                <li key={index}>
                  {err}
                </li>
              );
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            handleChange={e => setDisplayName(e.target.value)}
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={e => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">
            Register
          </Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
