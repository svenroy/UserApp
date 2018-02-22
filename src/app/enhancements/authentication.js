import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function withAuthentication(WrappedComponent) {
    const WithAuthentication = (props) => {
        if (!props.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        return (<WrappedComponent { ...props } />);
    };

    const { bool } = PropTypes;    
    WithAuthentication.propTypes = {
        isAuthenticated: bool.isRequired,
    };

    const mapStateToProps = ( state ) => ({
        isAuthenticated: global.utils.validSession(),
    });

    return connect(mapStateToProps)(WithAuthentication);
}

export const redirectIfAuthenticated = (WrappedComponent) => {
    const RedirectIfAuthenticated = (props) => {
        if (props.isAuthenticated) {
            return <Redirect to="/home" />;
        }
        return (<WrappedComponent { ...props } />);
    };

    const { bool } = PropTypes;    
    RedirectIfAuthenticated.propTypes = {
        isAuthenticated: bool.isRequired,
    };

    const mapStateToProps = (state) => ( {
        isAuthenticated: global.utils.validSession(),
    } );

    return connect(mapStateToProps)(RedirectIfAuthenticated);
}
