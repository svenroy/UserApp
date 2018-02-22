import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import autoBind from 'react-autobind';
import * as duck from '../state';

import constants from '../../../../config/constants';

import SignUpView from './_signUp';
import ConfirmationView from './_verification';

class SignUpContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmationCode: "",
            tabIndex: 0
        }

        autoBind(this);
    }

    handleSubmit(){
        const {email, password} = this.state;

        let role = constants.userRoles.user;
        if(this.state.tabIndex !== 0){
            role = constants.userRoles.client;
        }

        this.props.signUp(email, password, role);
    }

    handleConfimationSubmit(){
        this.props.confirm(this.state.email, this.state.confirmationCode, () => {
            this.props.history.push("/");
        });
    }

    handleResendConfirmation(e){
        e.preventDefault();
        this.props.resendConfirmation(this.state.email);
    }

    handleChange(e) {
        let newState = { [e.target.name]: e.target.value };
        this.setState(state => newState);
    }

    handleTabChange = (event, tabIndex) => {
        this.setState({ tabIndex });
    };
    
    render() {
        const confirmationView = 
        <ConfirmationView 
            handleChange={this.handleChange}
            handleSubmit={this.handleConfimationSubmit}
            confirmationCode={this.state.confirmationCode}
            handleResendConfirmation={this.handleResendConfirmation} />;

        if(this.props.attemptedSignUp && !this.props.signedUp){
            return confirmationView;
        }

        if(this.props.signedUp && !this.props.confirmed) {
            return confirmationView;
        }
                 
        return(<SignUpView 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleTabChange={this.handleTabChange}
            {...this.state}/>);
    }
}

export default withRouter(connect(
    (state, ownProps) => ({...state.registration, history: ownProps.history}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(SignUpContainer));