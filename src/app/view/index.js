import React, {Component} from 'react';
import {defaultRoutes, clientAppRoutes, userAppRoutes} from '../routes';
import { Route, withRouter, Switch } from 'react-router-dom';
import Menu from './_menu';

import {bindActionCreators} from 'redux';

import { 
  selectors as signUpSelectors
} from '../features/signup';

import { connect } from 'react-redux';

import Drawer from './_drawer';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import {
  selectors as authenticationSelectors,
  actions as loginActions
} from '../features/authentication';

const theme = createMuiTheme();

class App extends Component {

    handleSignOut = () => {
        this.props.actions.login.signOut();
    };

    render(){
        let routes = defaultRoutes;

        if(this.props.authenticated){
            if(this.props.role === "client"){
                routes = [...defaultRoutes, ...clientAppRoutes];
            } else if(this.props.role === "user") {
                routes = [...defaultRoutes, ...userAppRoutes];
            }
        }
        
        return <MuiThemeProvider theme={theme}>
                <Drawer menu={<Menu handleSignOut={this.handleSignOut} {...this.props} />}>
                    <Switch>
                        {routes.map(route => (
                            <Route key={route.path} {...route} />
                        ))}
                    </Switch>
                </Drawer>
            </MuiThemeProvider>;
    }
}

export default withRouter(
    connect(
        (state, ownProps) => ({
          registrationConfirmed: signUpSelectors.getRegistrationConfirmation(state, ownProps),
          authenticated: authenticationSelectors.getUserAuthenticated(),
          role: authenticationSelectors.getUserRole(),
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