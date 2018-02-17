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

import Drawer from './_Drawer';

import {
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Divider
} from 'material-ui';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import MailIcon from 'material-ui-icons/Mail';

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

const Dashboard = ({role}) => {
  if(role ===  "client"){
    return <ClientDashboardView />;
  } else{
    return <DashboardView />;
  }
}

const MenuItems = ({authenticated, handleSignOut, history}) => {
  const signedIn = <div>
    <Divider />
      <List>
          <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                  <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
          </ListItem>
      </List>
  </div>;

  const signedOut = <div>
    <Divider />
      <List>
          <ListItem button onClick={() => history.push(loginRoute)}>
              <ListItemIcon>
                  <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Sign in" />
          </ListItem>
          <ListItem button onClick={() => history.push(signUpRoute)}>
              <ListItemIcon>
                  <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Sign up" />
          </ListItem>
      </List>
  </div>;

  return <div>
      {authenticated ? signedIn : signedOut}
    </div>;
}

const theme = createMuiTheme();

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
      <Route exact path={homeRoute} render={() => <Redirect to={dashboardRoute} />} />

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

    return <MuiThemeProvider theme={theme}>
            <Drawer menu={<MenuItems 
                              handleSignOut={this.handleSignOut}
                              {...this.props} />}>
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