import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../state';
import autobind from 'react-autobind';

import menu from './_menu';
import ListServicesView from './_listServices';
import AddServiceView from './_addService';
import LoadingIndicator from './_loadingIndicator';

class ClientDashboardContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: "",
            url: ""
        };

        autobind(this);
    }

    componentDidMount(){
        this.props.loadClientServices();
    }

    handleAddClick() {
        this.props.history.push("/services/create");
    }

    handleChange(e){
        let newState = { [e.target.name]: e.target.value };
        this.setState(state => newState);
    }

    handleAddSubmit(){
        if(this.state.name.length > 0) {
            this.props.addClientService(this.state.name, this.state.url);
            this.props.history.push("/services");
        }        
    }

    render(){
        if(this.props.isLoading){
            return <LoadingIndicator/>;
        } else {
            return <div>
                <Route 
                    exact path={"/services"}
                    render={() => <ListServicesView {...this.props} 
                                                    handleAddClick={this.handleAddClick} />}/>
                <Route 
                    path={"/services/create"} 
                    render={() => <AddServiceView {...this.props}
                                                handleChange={this.handleChange}
                                                handleSubmit={this.handleAddSubmit}
                                                {...this.state} />}/>
            </div>;
        }
    }
}

export {
    menu
}

export default withRouter(connect(
    (state, ownProps) => ({...state.clientDashboard, history: ownProps.history}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(ClientDashboardContainer));