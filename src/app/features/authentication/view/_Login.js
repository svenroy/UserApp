import React from 'react';
import {Paper, TextField, Button, Typography, Divider} from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    }
});

const LoginView = ({
    handleSubmit, 
    attemptedLogin, 
    loginSucceeded, 
    handleChange, 
    email, 
    password, 
    classes}) => {
    return <Paper style={{padding: "50px"}}>
        <Typography variant="display2" color="primary">Sign in</Typography>
        <br/>
        <Divider/>
        <br/>
        <form className={classes.container} noValidate autoComplete="off">
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
                SIGN IN
            </Button>                      
        </form>        
        {attemptedLogin && !loginSucceeded && (<Typography color="error">Something went wrong! Try again</Typography> )}
    </Paper>; 
}

export default withStyles(styles)(LoginView);