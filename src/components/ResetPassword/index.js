import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './styles.scss';
import { resetPassword, resetAllAuthForms } from '../../redux/User/user.actions';
import FormInput from '../forms/FormInput'
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
  passwordResetSuccess: user.passwordResetSuccess,
  passwordResetErrors: user.passwordResetErrors,
});

const ResetPassword = props => {
  const {
    passwordResetErrors,
    passwordResetSuccess
  } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (Array.isArray(passwordResetErrors) && passwordResetErrors.length > 0) {
      setErrors(passwordResetErrors);
    }
  }, [passwordResetErrors]);

  useEffect(() => {
    if (passwordResetSuccess) {
      dispatch(resetAllAuthForms());
      props.history.push('/login');
    }
    // eslint-disable-next-line 
  }, [passwordResetSuccess]);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(resetPassword({ email }));
  };

  const configAuthWarapper = {
    headline: 'Reset Password',
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
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />
          <Button type="submit">
            Email Password
          </Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(ResetPassword);
