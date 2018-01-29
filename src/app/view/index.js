import React from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';

import { 
  view as SignUpView,
  selectors as signUpSelectors,
  route as signUpRoute 
} from '../features/signup';

import { connect } from 'react-redux';
import 'bootstrap';
import './style.css';

import {
  view as LoginView, 
  route as loginRoute,
  selectors as authenticatonSelectors
} from '../features/login';

import {
  view as DashboardView, 
  route as dashboardRoute
} from '../features/dashboard';

const homeRoute = "/";

const NavigationBar = () => 
  <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand">Dashboard</a>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-item nav-link" to={loginRoute}>Login</Link>
        <Link className="nav-item nav-link" to={signUpRoute}>Sign up</Link>
      </div>
    </div>
  </nav>;

const App = ({registrationConfirmed, authenticated}) => 
  <div>
    <NavigationBar />
    <Route exact path={homeRoute} render={() => <Redirect to={dashboardRoute} />}/>

    <Route path={dashboardRoute} render={() => (authenticated 
      ? <DashboardView /> 
      : <Redirect to={loginRoute}/>)}/>

    <Route path={loginRoute} render={() => (authenticated
      ? <Redirect to={dashboardRoute}/>
      : <LoginView />)} /> 

    <Route path={signUpRoute} 
      render={() => (registrationConfirmed 
        ? <Redirect to={loginRoute} />
        : <SignUpView />)} />
  </div>;

export default withRouter(
  connect(
      (state, ownProps) => ({
        registrationConfirmed: signUpSelectors.getRegistrationConfirmation(state, ownProps),
        authenticated: authenticatonSelectors.getUserAuthenticated(state, ownProps),
        history: ownProps.history
    }), null
  )(App)
);