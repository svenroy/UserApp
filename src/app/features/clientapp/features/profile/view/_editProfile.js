import React from 'react';
import { withStyles } from 'material-ui/styles';
import {
    Paper, Typography, Divider, TextField, Button
} from 'material-ui';

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

const view = ({
    name,
    profileName,
    handleSubmit,
    handleChange,
    classes
}) => {

    const id = global.utils.getUserId();    
    const url = `${window.location.origin}/subscribe/${id}`;

    return <Paper style={{padding: "50px"}}>
            <Typography variant="display2" color="primary">Profile</Typography>
            <br/>
            <Divider/>
            <br/>
            {profileName !== "" && <Typography>{url}</Typography>}
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    name="name"
                    label="Name"
                    className={classes.textField}
                    value={name}
                    onChange={handleChange}
                    margin="normal"/>
                <br/>
                <Button 
                    variant="raised" 
                    color="primary" 
                    className={classes.button}
                    onClick={handleSubmit}>
                    SAVE
                </Button>                      
            </form>
        </Paper>;
};

export default withStyles(styles)(view);