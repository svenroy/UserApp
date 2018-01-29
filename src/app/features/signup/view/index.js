import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../state';

class SignUpContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmationCode: "",
        }
    }

    handleSubmit(){
        this.props.signUp(this.state.email, this.state.password);
    }

    handleConfimationSubmit(){
        this.props.confirm(this.state.email, this.state.confirmationCode);
    }

    handleResendConfirmation(){
        this.props.resendConfirmation(this.state.email);
    }

    handleChange(e) {
        let newState = { [e.target.name]: e.target.value };
        this.setState(state => newState);
    }
    
    render() {
        if(this.props.attemptedSignUp && !this.props.signedUp){
            return(<ConfirmationView 
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleConfimationSubmit.bind(this)}
                confirmationCode={this.state.confirmationCode}
                handleResendConfirmation={this.handleResendConfirmation.bind(this)} />);
        }

        if(this.props.signedUp && !this.props.confirmed) {
            return(<ConfirmationView 
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleConfimationSubmit.bind(this)}
                confirmationCode={this.state.confirmationCode} />);
        }
                 
        return(<SignUpView 
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            email={this.state.email}
            password={this.state.password} />);
    }
}

const SignUpView = ({handleChange, email, password, handleSubmit}) => {
    return <div className="container">
        <form className="form-signin" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
            <h2 className="form-signin-heading">Sign up</h2>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input name="email" value={email} onChange={e => handleChange(e)} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input name="password" value={password} onChange={e => handleChange(e)} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
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
            <a href="#" onClick={handleResendConfirmation}>Resend confirmation email</a>
        </form>        
    </div>;
}

export default connect(
    (state, ownProps) => ({...state.registration}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(SignUpContainer);