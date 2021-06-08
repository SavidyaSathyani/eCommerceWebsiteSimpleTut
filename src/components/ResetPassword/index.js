import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './styles.scss';
import { auth } from '../../firebase/utils';
import FormInput from '../forms/FormInput'
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';

const initialState = {
  email: '',
  errors: [],
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const {
        email,
      } = this.state;

      const config = {
        url: 'http://localhost:3000/login',
      };

      await auth.sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push('/login');
        })
        .catch(() => {
          const err = ['Email not found. Please try again.'];
          this.setState({
            errors: err,
          });
        });

    } catch (err) {
      // console.log(err);
    }
  }

  render() {
    const {
      email,
      errors,
    } = this.state;

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
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <Button type="submit">
              Email Password
            </Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
};

export default withRouter(ResetPassword);
