import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import './default.scss';

// layouts
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';

// pages
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';

const initialState = {
  currentUser: null,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListner = null;

  componentDidMount() {
    this.authListner = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            },
          });
        });
      }

      this.setState({
        ...initialState
      });
    });
  }

  componentWillUnmount() {
    this.authListner();
  }

  render() {
    const {
      currentUser,
    } = this.state;

    return (
      <div className="app" >
        <Switch>
          <Route exact path="/" render={() => (
            <HomePageLayout currentUser={currentUser}>
              <Home />
            </HomePageLayout>
          )} />
          <Route path="/registration"
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )} />
          <Route path="/login"
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )} />
          <Route path="/recovery" render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />
        </Switch>
      </div>
    );
  }
}

export default App;
