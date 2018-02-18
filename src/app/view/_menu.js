import React from 'react';
import {
    List, 
    ListItem, 
    ListItemText, 
    Divider
} from 'material-ui';

import {
    menu as ClientDashboardMenu,
} from '../features/client-dashboard';

import {
    menu as UserDashboardMenu,
} from '../features/user-dashboard';

import { 
    route as signUpRoute 
} from '../features/signup';

import {
    route as loginRoute
} from '../features/authentication';

const Menu = ({authenticated, handleSignOut, history, role}) => {
    const signedIn = <div>
      <Divider />
        <List>
            <ListItem button onClick={handleSignOut}>
                <ListItemText primary="Sign out" />
            </ListItem>
        </List>
    </div>;
  
    const signedOut = <div>
      <Divider />
        <List>
            <ListItem button onClick={() => history.push(loginRoute)}>
                <ListItemText primary="Sign in" />
            </ListItem>
            <ListItem button onClick={() => history.push(signUpRoute)}>
                <ListItemText primary="Sign up" />
            </ListItem>
        </List>
    </div>;
  
    let currentViewMenu = <UserDashboardMenu history={history} />;

    if(role === "client"){
        currentViewMenu = <ClientDashboardMenu history={history} />;
    }
  
    return <div>        
        {authenticated 
            ? <div>
                {currentViewMenu}
                {signedIn}
              </div> 
            : signedOut}
      </div>;
};

export default Menu;
