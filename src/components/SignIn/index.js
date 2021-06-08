import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { signInWithGoogle, auth } from '../../firebase/utils';
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import AuthWrapper from '../AuthWrapper';

const initialState = {
  email: '',
  password: '',
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();

    const {
      email,
      password,
    } = this.state;

    try {

      await auth.signInWithEmailAndPassword(email, password);

      this.setState({
        ...initialState
      });

    } catch (err) {
      console.log(err);
    }
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

  render() {
    const {
      email,
      password,
    } = this.state;

    const configAuthWarapper = {
      headline: 'Login',
    };

    return (
      <AuthWrapper {...configAuthWarapper}>
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>

            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
            />

            <Button type="submit">
              Sign in
              </Button>
            <Button onClick={signInWithGoogle}>
              Sing in with Google
            </Button>

            <div className="links">
              <Link to="/recovery">
                Forgot Passward?
              </Link>
            </div>
          </form>
        </div>
      </AuthWrapper>
    );
  }
};

export default SignIn;
