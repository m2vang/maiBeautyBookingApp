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
import InfoPage from './components/InfoPage/InfoPage';
import AdminCalendar from './components/Calendar/Calendar';
import BookAnAppt from './components/BookAnAppt/BookAnAppt';
import ListOfClients from './components/ListOfClients/ListOfClients';
import ErrorPage from './components/ErrorPage/ErrorPage';
import AppointmentsPage from './components/AppointmentsPage/AppointmentsPage';

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
          path="/bookappt"
          component={BookAnAppt}
        />
        <Route
          path="/calendar"
          component={AdminCalendar}
        />
        <Route
          path="/clients"
          component={ListOfClients}
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
