import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../state';
import autoBind from 'react-autobind';
import constants from '../../../../config/constants';

import SignUpView from './_SignUp';
import ConfirmationView from './_Verification';

class SignUpContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "roystonyinkore@gmail.com",
            password: "Abc123!!",
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
        this.props.confirm(this.state.email, this.state.confirmationCode);
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

export default connect(
    (state, ownProps) => ({...state.registration}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(SignUpContainer);