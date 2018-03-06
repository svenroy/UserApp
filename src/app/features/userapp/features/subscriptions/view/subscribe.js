import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as duck from '../state';

import SubscribeView from './_subscribe';

class Subscribe extends Component {
    constructor(props){
      super(props);

      this.state = {
          subscribedServices: []
      };
    }

    componentDidMount(){
      this.props.getClientProfileAndServices(this.props.match.params.id);       
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.subscribeTo !== null){
            const subscribedServices = nextProps.subscribeTo.services
                .filter(d => d.subscribed === true)
                .map(d => d.id);

            this.setState({subscribedServices});
        }        
    }

    handleSubscribeClick = () => {
        this.props.subscribe(this.props.subscribeTo.client.id, this.state.subscribedServices, () => {
            this.props.history.push("/subscriptions");
        });
    };

    handleAddServiceToggle = (serviceId) => {
        let subscribedServices = [];
        if(this.state.subscribedServices.includes(serviceId)){
            subscribedServices = this.state.subscribedServices.filter(d => d !== serviceId);            
        } else {
            subscribedServices = [...this.state.subscribedServices, serviceId];
        }

        this.setState({subscribedServices});
    };

    handleIsChecked = (serviceId) => {
        return this.state.subscribedServices.includes(serviceId);
    };     

    render(){
        if(this.props.isLoading || this.props.subscribeTo === null){
          return <div>Loading...</div>;
        }

        return <SubscribeView 
          isChecked={this.handleIsChecked}
          handleToggle={this.handleAddServiceToggle}
          handleSubmit={this.handleSubscribeClick}
          clientServices={this.props.subscribeTo.services}
          clientName={this.props.subscribeTo.client.name}
          hasSelectedServices={this.state.subscribedServices.length > 0}/>;
    }
};

export default withRouter(connect(
  (state, ownProps) => ({...state.userSubscriptions, history: ownProps.history}),
  (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(Subscribe));