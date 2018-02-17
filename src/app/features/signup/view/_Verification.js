import React from 'react';
import {Paper, TextField, Button, Typography, Divider} from 'material-ui';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    container: {
    },
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
    },
});

const VerificationView = ({
    handleChange, 
    confirmationCode, 
    handleSubmit,
    handleResendConfirmation,
    classes}) =>{

    return <Paper style={{padding: "50px"}}>
        <Typography variant="display2" color="primary">Verify</Typography>
        <br/>
        <Divider/>
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                name="confirmationCode"
                label="Verification code"
                className={classes.textField}
                value={confirmationCode}
                onChange={handleChange}
                margin="normal"/>
            <br/>
            <Button 
                variant="raised" 
                color="primary" 
                className={classes.button}
                onClick={handleSubmit}>
                VERIFY
            </Button>                      
        </form>    
        <br/>
        <a href="/resendconfirmation" onClick={handleResendConfirmation}><Typography>Resend confirmation email</Typography></a>    
    </Paper>;
};

VerificationView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerificationView);