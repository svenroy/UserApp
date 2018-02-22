import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as duck from '../state';

import menu from './_menu';
import AddService from './_addService';

class DashboardContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: ""
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.addService != null && this.props.addService !== nextProps.addService){
            this.setState({
                name: nextProps.addService.name
            });
        }
    }

    handleTextChange = () => {
        console.log("text change");
    }

    handleAddServiceSubmit = () => {
        if(this.props.addService != null){
            this.props.addService(this.props.addService.id);
        }
    }

    render(){
        return <div>
            <Route exact path="/services" render={() => <div>Services</div>}/>
            <Route path="/services/add/:id" render={({match}) => {
                if(this.props.addService == null){
                    this.props.getClientService(match.params.id);
                    return <div>Loading...</div>;
                }

                return <AddService service={this.props.addService}
                    handleTextChange={this.handleTextChange}
                    handleSubmit={this.handleAddServiceSubmit}
                    name={this.state.name} />;
            }}/>
        </div>;
    }
}

export {
    menu
}

export default withRouter(connect(
    (state, ownProps) => ({...state.userDashboard}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(DashboardContainer));