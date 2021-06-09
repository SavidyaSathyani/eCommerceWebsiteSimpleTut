import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';
import { signUpUser, resetAllAuthForms } from '../../redux/User/user.actions';
import FormInput from '../forms/FormInput'
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
  signUpErrors: user.signUpErrors,
  signUpSuccess: user.signUpSuccess,
});

const SignUp = props => {
  const {
    signUpErrors,
    signUpSuccess,
  } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (signUpSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push('/');
    }
    // eslint-disable-next-line 
  }, [signUpSuccess]);

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
    dispatch(signUpUser({
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

export default withRouter(SignUp);
