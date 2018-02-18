import React, {Component} from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import autoBind from 'react-autobind';

import { 
  view as SignUpView,
  selectors as signUpSelectors,
  route as signUpRoute 
} from '../features/signup';

import { connect } from 'react-redux';

import Drawer from './_drawer';
import Menu from './_menu';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import {
  view as LoginView, 
  route as loginRoute,
  selectors as authenticationSelectors,
  actions as loginActions
} from '../features/authentication';

import {
  view as DashboardView
} from '../features/user-dashboard';

import {
  view as ClientDashboardView
} from '../features/client-dashboard';

const homeRoute = "/";
const servicesRoute = "/services";

const theme = createMuiTheme();

const Dashboard = ({role}) => {
  if(role ===  "client"){
    return <ClientDashboardView />;
  } else{
    return <DashboardView />;
  }
}

const PrivateRoute = ({ authenticated, render, ...rest }) => (
  <Route {...rest} render={props => (
    authenticated 
      ? (render(props)) 
      : (<Redirect to={{pathname: loginRoute, state: { from: props.location }}} />)
    )} />
);

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
    
    const content = <div>    
      <Route exact path={homeRoute} render={() => <Redirect to={servicesRoute} />} />      

      <PrivateRoute 
        authenticated={authenticated} 
        path={servicesRoute} 
        render={() => <Dashboard role={role} />}/>

      <Route path={loginRoute} render={() => (authenticated
        ? <Redirect to={servicesRoute}/>
        : <LoginView />)} /> 

      <Route path={signUpRoute} 
        render={() => (registrationConfirmed 
          ? <Redirect to={loginRoute} />
          : <SignUpView />)} />
    </div>;

    return <MuiThemeProvider theme={theme}>
            <Drawer menu={<Menu handleSignOut={this.handleSignOut} {...this.props} />}>
                {content}
            </Drawer>
           </MuiThemeProvider>;
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