import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as duck from '../state';

import menu from './_menu';

class DashboardContainer extends Component {

    componentDidMount(){
        this.props.loadUserServices();
    }

    render(){
        return <div>
            <Route exact path="/services" render={() => <div>Services</div>}/>
            <Route exact path="/services/add" render={() => <div>Services add</div>}/>
        </div>;
    }
}

export {
    menu
}

export default withRouter(connect(
    (state, ownProps) => ({}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(DashboardContainer));