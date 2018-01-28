import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../state';
import { Link } from 'react-router-dom';

class LoginContainer extends Component {    
    constructor(props){
        super(props);

        this.state = {
            password: {
                value: "",
                errors: []
            },
            email: {
                value: "",
                errors: []
            }
        };
    }

    handleSubmit() {
        this.props.login(this.state.email, this.state.password);
    }

    render() {
        console.log(this.props);
        return(<LoginView 
            handleSubmit={this.handleSubmit.bind(this)}
            {...this.props}/>);
    }
}

const LoginView = ({handleSubmit, attemptedLogin, loginSucceeded}) => {
    return <div className="container">
    <form className="form-signin" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        <h2 className="form-signin-heading">Please sign in</h2>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        <div className="checkbox">
        <label>
            <input type="checkbox" value="remember-me" /> Remember me
        </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        {attemptedLogin && !loginSucceeded && (<p>Something went wrong!. Try again</p> )}
        <Link to="/signup">Not registered? Sign up</Link>
    </form>
</div>;
}

export default connect(
    (state, ownProps) => ({...state.authentication}),
    (dispatch, ownProps) => bindActionCreators(duck.actions, dispatch)
)(LoginContainer);