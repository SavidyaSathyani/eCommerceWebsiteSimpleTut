import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';
import './default.scss';

// hoc
import WithAuth from './hoc/WithAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// layouts
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';

// pages
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

//components 
import AdminToolBar from './components/AdminToolBar';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

    // eslint-disable-next-line
  }, []);

  return (
    <div className="app" >
      <AdminToolBar />
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
        <Route path="/admin"
          render={() => (
            <WithAdminAuth>
              <MainLayout>
                <Admin />
              </MainLayout>
            </WithAdminAuth>
          )} />
      </Switch>
    </div>
  );
}

export default App;
