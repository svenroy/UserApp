import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as duck from '../state';

import Subscribe from './subscribe';
import SubscriptionsView from './_listSubscriptions';

class Subscriptions extends Component {
    componentDidMount(){
        this.props.getUserServices();
    }       

    render(){
        if(this.props.isLoading){
            return <div>Loading...</div>;
        }

        return <SubscriptionsView subscriptions={this.props.subscriptions} />;
    }
}

export {
    Subscribe
}

export default withRouter(connect(
    (state, ownProps) => ({...state.userSubscriptions}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(Subscriptions));