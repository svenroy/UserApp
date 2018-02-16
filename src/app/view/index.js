import React, {Component} from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import autoBind from 'react-autobind';

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
  selectors as authenticationSelectors,
  actions as loginActions
} from '../features/authentication';

import {
  view as DashboardView, 
  route as dashboardRoute
} from '../features/user-dashboard';

import {
  view as ClientDashboardView, 
} from '../features/client-dashboard';

const homeRoute = "/";

const NavigationBar = ({authenticated, handleSignOut}) => 
  <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand">Dashboard</a>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        {authenticated 
          ? <a className="nav-item nav-link" href="/signout" onClick={e => {e.preventDefault(); handleSignOut();}}>Sign out</a>
          : <Link className="nav-item nav-link" to={loginRoute}>Sign in</Link>}
        {!authenticated && <Link className="nav-item nav-link" to={signUpRoute}>Sign up</Link>}
      </div>
    </div>
  </nav>;

const Dashboard = ({role}) => {
  if(role ===  "client"){
    return <ClientDashboardView />;
  } else{
    return <DashboardView />;
  }
}

class App extends Component {
  constructor(props){
    super(props);
    autoBind(this);
  }

  componentDidMount(){
    this.props.actions.login.checkUserSession();
  }

  handleSignOut(){
    this.props.actions.login.signOut();
  }

  render(){
    const {registrationConfirmed, authenticated, role} = this.props;
    return <div>
      <NavigationBar authenticated={authenticated} handleSignOut={this.handleSignOut} />
      <Route exact path={homeRoute} render={() => <Redirect to={dashboardRoute} />}/>

      <Route path={dashboardRoute} render={() => (authenticated 
        ? <Dashboard role={role} /> 
        : <Redirect to={loginRoute}/>)}/>

      <Route path={loginRoute} render={() => (authenticated
        ? <Redirect to={dashboardRoute}/>
        : <LoginView />)} /> 

      <Route path={signUpRoute} 
        render={() => (registrationConfirmed 
          ? <Redirect to={loginRoute} />
          : <SignUpView />)} />
    </div>;
  }
}

export default withRouter(
  connect(
      (state, ownProps) => ({
        registrationConfirmed: signUpSelectors.getRegistrationConfirmation(state, ownProps),
        authenticated: authenticationSelectors.getUserAuthenticated(state, ownProps),
        role: authenticationSelectors.getUserRole(state, ownProps),
        history: ownProps.history
      }), 
      (dispatch, ownProps) => {
        return {
          actions: {
            login: bindActionCreators(loginActions, dispatch)
          }
        };
      }
  )(App)
);