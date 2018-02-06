import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../state';
import autoBind from 'react-autobind';
import constants from '../../../../config/constants';

class SignUpContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "roystonyinkore@gmail.com",
            password: "Abc123!!",
            confirmationCode: "",
            role: constants.userRoles.user
        }

        autoBind(this);
    }

    handleSubmit(){
        const {email, password, role} = this.state;
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

    handleRoleChange(e){
        this.setState({role: e.target.value});  
    }
    
    render() {
        if(this.props.attemptedSignUp && !this.props.signedUp){
            return(<ConfirmationView 
                handleChange={this.handleChange}
                handleSubmit={this.handleConfimationSubmit}
                confirmationCode={this.state.confirmationCode}
                handleResendConfirmation={this.handleResendConfirmation} />);
        }

        if(this.props.signedUp && !this.props.confirmed) {
            return(<ConfirmationView 
                handleChange={this.handleChange}
                handleSubmit={this.handleConfimationSubmit}
                confirmationCode={this.state.confirmationCode} />);
        }
                 
        return(<SignUpView 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleRoleChange={this.handleRoleChange}
            {...this.state}/>);
    }
}

const SignUpView = ({handleChange, email, password, role, handleSubmit, handleRoleChange}) => {
    const {user, client} = constants.userRoles;

    return <div className="container">
        <form className="form-signin" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
            <h2 className="form-signin-heading">Sign up</h2>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input name="email" value={email} onChange={e => handleChange(e)} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input name="password" value={password} onChange={e => handleChange(e)} type="password" id="inputPassword" className="form-control" placeholder="Password" required />

            <div onChange={handleRoleChange}>
                <input className="form-control" type="radio" name="role" value={user} defaultChecked={role === user} />
                <label htmlFor="userRole" >User</label>            

                <input className="form-control" type="radio" name="role" value={client} defaultChecked={role === client} />
                <label htmlFor="clientRole">Business</label> 
            </div>            

            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
        </form>
    </div>;
}

const ConfirmationView = ({
    handleChange, 
    confirmationCode, 
    handleSubmit,
    handleResendConfirmation}) => {
    return <div className="container">
        <form className="form-signin" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
            <h2 className="form-signin-heading">Confirmation</h2>
            <label htmlFor="confirmationCode" className="sr-only">Email address</label>
            <input id="confirmationCode"  name="confirmationCode" value={confirmationCode} onChange={e => handleChange(e)} type="text" className="form-control" placeholder="Confirmation code" required autoFocus />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Confirm</button>
            <a href="/resendconfirmation" onClick={handleResendConfirmation}>Resend confirmation email</a>            
        </form>        
    </div>;
}

export default connect(
    (state, ownProps) => ({...state.registration}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(SignUpContainer);