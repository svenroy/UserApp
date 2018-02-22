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

const AddServiceView = ({
    handleTextChange,
    handleSubmit,
    name,
    service, 
    classes}) => {
    return <Paper style={{padding: "50px"}}>
        <Typography variant="display2" color="primary">New service</Typography>
        <br/>
        <Divider/>
        <br/>
        <form className={classes.container} noValidate autoComplete="off">
        {
            service == null
            ? <TextField
                name="name"
                label="Name"
                className={classes.textField}
                value={name}
                onChange={handleTextChange}
                margin="normal"/>
            : <TextField
                disabled
                name="name"
                label="Name"
                className={classes.textField}
                value={name}
                onChange={handleTextChange}
                margin="normal"/>
        }
            <br/>
            <Button 
                variant="raised" 
                color="primary" 
                className={classes.button}
                onClick={handleSubmit}>
                ADD
            </Button>                      
        </form>
    </Paper>; 
}

export default withStyles(styles)(AddServiceView);