import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import EditProfile from './_editProfile';
import * as duck from '../state';

class ProfileContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: props.profile.name,
        };
    }

    componentDidMount(){
        this.props.loadProfile();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            name: nextProps.profile.name
        });
    }

    handleSave = () => {
        if(this.state.name !== ""){
            this.props.saveProfile(this.state.name);
        }        
    };

    handleTextChange = e => {
        let newState = { [e.target.name]: e.target.value };
        this.setState(state => newState);
    };

    render(){
        return <EditProfile
            profileName={this.props.profile.name} 
            name={this.state.name}
            handleChange={this.handleTextChange}
            handleSubmit={this.handleSave} />;
    }
};

export default withRouter(connect(
    (state, ownProps) => ({...state.clientProfile}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(ProfileContainer));