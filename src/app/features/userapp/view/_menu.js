import React from 'react';
import {
    List, 
    ListItem, 
    ListItemText, 
    Divider
} from 'material-ui';

const Menu = ({history}) => {
    return <div>
    <Divider />
      <List>
          <ListItem button onClick={() => history.push("/home")}>
              <ListItemText primary="Dashboard" />
          </ListItem>          
          <ListItem button onClick={() => history.push("/subscriptions")}>
              <ListItemText primary="My subscriptions" />
          </ListItem>
      </List>
  </div>;
}

export default Menu;