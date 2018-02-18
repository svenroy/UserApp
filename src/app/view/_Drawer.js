import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',//430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

class PermanentDrawer extends React.Component {
  render() {
    const { classes } = this.props;
    const anchor = "left";

    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={anchor}>
        <div className={classes.drawerHeader} />
        {this.props.menu}
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Sevii
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          <main className={classes.content}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  menu: PropTypes.element
};

export default withStyles(styles)(PermanentDrawer);