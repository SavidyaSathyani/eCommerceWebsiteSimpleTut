import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './default.scss';

// layouts
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';

// pages
import Homepage from './pages/HomePage';
import Registration from './pages/Registration';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" render={() => (
          <HomePageLayout>
            <Homepage />
          </HomePageLayout>
        )} />
        <Route path="/registration" render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />
      </Switch>
    </div>
  );
}

export default App;
