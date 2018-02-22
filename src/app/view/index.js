import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import {defaultRoutes, clientAppRoutes, userAppRoutes} from '../routes';

import constants from '../../config/constants';

import Menu from './_menu';
import Drawer from './_drawer';

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
            if(this.props.role === constants.userRoles.client){
                routes = [...defaultRoutes, ...clientAppRoutes];
            } else if(this.props.role === constants.userRoles.user) {
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