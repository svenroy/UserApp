import React from 'react';
import { Route, Link } from 'react-router-dom';
import {view as SignUpView} from '../features/sign-up';
import 'bootstrap';
import './style.css';

import {
  view as LoginView, 
  route as loginRoute
} from '../features/login';

const NavigationBar = () => 
  <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand">Dashboard</a>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-item nav-link" to={loginRoute}>Login</Link>
        <Link className="nav-item nav-link" to="/signup">Sign up</Link>
      </div>
    </div>
  </nav>;

const App = () => 
  <div>
    <NavigationBar />
    <Route path={loginRoute} component={LoginView}/>
    <Route path="/signup" component={SignUpView}/>
  </div>;

export default App;