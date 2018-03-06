import React from 'react';
import {Typography} from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import List, { ListItem } from 'material-ui/List';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
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

const ServicesView = ({classes, subscriptions}) => {    
    return <div className={classes.root}>               
            {
                subscriptions.length > 0 
                ?
                    <List>
                        {subscriptions.map((d, index) => {
                            return <div key={index}>
                                <ListItem>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography variant="headline" component="h2">
                                                {d.name}
                                            </Typography>
                                        </CardContent>
                                    </Card> 
                                </ListItem>                                
                            </div>
                        })}
                    </List>
                : <Typography>No services</Typography>
            }   
        </div>;
};

ServicesView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServicesView);