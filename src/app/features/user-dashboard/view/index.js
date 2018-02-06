import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../state';

class DashboardContainer extends Component {

    componentDidMount(){
        //this.props.loadUserServices();
    }

    render(){
        return <div>
            Dashboard
        </div>;
    }
}

export default connect(
    (state, ownProps) => ({}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(DashboardContainer);