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
          <ListItem button onClick={() => history.push("/services")}>
              <ListItemText primary="Services" />
          </ListItem>
          <ListItem button onClick={() => history.push("/profile")}>
              <ListItemText primary="Profile" />
          </ListItem>
      </List>
  </div>;
}

export default Menu;