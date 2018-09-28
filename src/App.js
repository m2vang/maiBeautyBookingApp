import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

//shared view between admin & user
import InfoPage from './components/InfoPage/InfoPage';

//admin view
import Calendar from './components/Calendar/Calendar';
import ListOfClients from './components/ListOfClients/ListOfClients';

//client view
import AppointmentsPage from './components/AppointmentsPage/AppointmentsPage';

//error view
import ErrorPage from './components/ErrorPage/ErrorPage';

import TechsUsedForProject from './components/TechsUsedForProject/TechsUsedForProject';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route
          path="/appointments"
          component={AppointmentsPage}
        />
        <Route
          path="/calendar"
          component={Calendar}
        />
        <Route
          path="/clients"
          component={ListOfClients}
        />
        <Route
          path="/techs"
          component={TechsUsedForProject}
        />
        {/* OTHERWISE (no path!) */}
        {/* <Route render={() => <h1>404</h1>} /> */}
        <Route
          component={ErrorPage}
        />

      </Switch>
    </Router>
  </div>
);

export default App;
