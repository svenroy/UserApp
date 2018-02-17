import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../state';

import LoginView from './_Login';

class Login extends Component {    
    constructor(props){
        super(props);

        this.state = {
            password: "Abc123!!",
            email: "roystonyinkore@gmail.com"
        };
    }

    handleSubmit() {
        this.props.login(this.state.email, this.state.password);
    }

    handleChange(e) {
        let newState = { [e.target.name]: e.target.value };
        this.setState(state => newState);
    }

    render() {
        return(<LoginView 
            handleSubmit={this.handleSubmit.bind(this)}
            handleChange={this.handleChange.bind(this)}
            {...this.props}
            {...this.state}/>);
    }    
}

export default connect(
    (state, ownProps) => ({...state.authentication}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(Login);