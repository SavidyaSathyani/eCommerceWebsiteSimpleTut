import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';
import './default.scss';

// hoc
import WithAuth from './hoc/WithAuth';

// layouts
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';

// pages
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authListner = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }));
        });
      }

      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      authListner();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app" >
      <Switch>
        <Route exact path="/"
          render={() => (
            <HomePageLayout>
              <Home />
            </HomePageLayout>
          )} />
        <Route path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
        <Route path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
        <Route path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />
        <Route path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )} />
      </Switch>
    </div>
  );
}

export default App;
