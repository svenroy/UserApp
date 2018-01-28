import React, { Component } from 'react';

class View extends Component {  
    render() {
        return(
        <div className="container">
            <form className="form-signin">
                <h2 className="form-signin-heading">Sign up</h2>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
        </div>);
    }
}

export default View;