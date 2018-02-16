import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../state';

class ClientDashboardContainer extends Component {
    componentDidMount(){
        this.props.loadClientServices();
    }

    render(){
        console.log(this.props.services);
        return <ClientDashboardView />;
    }
}

const ClientDashboardView = () => {
    return <div>Client dashboard</div>;
};

export default connect(
    (state, ownProps) => ({...state}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(ClientDashboardContainer);