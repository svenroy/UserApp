import React from 'react';
import {Button, Typography, Divider} from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import AddIcon from 'material-ui-icons/Add';

import List, { ListItem } from 'material-ui/List';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        //backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});

const ServicesView = ({classes, services, handleAddClick}) => {    
    return <div>
        <Button 
            variant="fab" 
            color="primary" 
            aria-label="add" 
            className={classes.button}
            onClick={handleAddClick}>
            <AddIcon />
        </Button>
        <br/>
        <Divider />
        <br/>
        <div className={classes.root}>               
            {
                services.length > 0 
                ?
                    <List>
                        {services.map((d, index) => {
                            return <div key={index}>
                                <ListItem>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography variant="headline" component="h2">
                                                {d.name}
                                            </Typography>
                                            <Typography className={classes.pos}>{d.key}</Typography>
                                            <Typography className={classes.pos}>{d.defaultValue}</Typography>
                                        </CardContent>
                                    </Card> 
                                </ListItem>                                
                            </div>
                        })}
                    </List>
                : <Typography>No services</Typography>
            }   
        </div>
    </div>;
};

ServicesView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServicesView);