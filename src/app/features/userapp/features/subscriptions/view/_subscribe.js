import React, { Component } from 'react';

import {
    Paper, 
    Typography, 
    Divider, 
    List, 
    ListItem, 
    ListItemText,
    Checkbox,
    Button
} from 'material-ui';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
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
    }
});

class SubscribeView extends Component {
    render(){

        const {
            clientName, 
            clientServices, 
            classes, 
            handleToggle,
            handleSubmit, 
            isChecked,
            hasSelectedServices
        } = this.props;
        
        return <Paper style={{padding: "50px"}}>
            <Typography variant="display2" color="primary">{clientName} - Subscriptions</Typography>
            <br/>
            <Divider/>
            <br/>
            <div className={classes.root}>
                <List>{clientServices.map(d => 
                    <ListItem
                        key={d.id}
                        role={undefined}
                        dense
                        button
                        onClick={() => handleToggle(d.id)}
                        className={classes.listItem}>
                        <Checkbox 
                            checked={isChecked(d.id)}
                            tabIndex={-1} 
                            disableRipple />
                        <ListItemText primary={d.name} />
                    </ListItem>)}
                </List> 
                <Button 
                    variant="raised" 
                    color="primary" 
                    disabled={!hasSelectedServices}
                    className={classes.button}
                    onClick={handleSubmit}>
                    SUBSCRIBE
                </Button>  
            </div>          
        </Paper>;
    }
};

export default withStyles(styles)(SubscribeView);