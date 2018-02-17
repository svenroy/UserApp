import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import {TextField, Typography, Button, Paper} from 'material-ui';

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class SignUpView extends React.Component {
  render() {
    const { 
        classes, 
        handleChange, 
        handleTabChange,
        email, 
        password, 
        handleSubmit,
        tabIndex 
    } = this.props;

    return (
      <div className={classes.root}>
        <Paper style={{padding: "50px", paddingBottom: "0px"}}>
            <Typography variant="display2" color="primary">Sign up</Typography>
            <br/>
        </Paper>
        <AppBar position="static" color="default">
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Personal" />
            <Tab label="Business" />
          </Tabs>
        </AppBar>
        <Paper>
            <TabContainer>
                <TextField
                    name="email"
                    label="Email"
                    className={classes.textField}
                    value={email}
                    onChange={handleChange}
                    margin="normal"/>

                <TextField
                    name="password"
                    label="Password"
                    className={classes.textField}
                    value={password}
                    onChange={handleChange}
                    margin="normal"
                    type="password"/>

                <br/>
                <Button 
                    variant="raised" 
                    color="primary" 
                    className={classes.button}
                    onClick={handleSubmit}>
                    SIGN UP
                </Button>
            </TabContainer>
        </Paper>                  
      </div>
    );
  }
}

SignUpView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpView);