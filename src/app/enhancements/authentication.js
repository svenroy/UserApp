import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function withAuthentication(WrappedComponent) {
    const WithAuthentication = (props) => {
        if (!global.utils.validSession()) {
            return <Redirect to="/login" />;
        }
        return (<WrappedComponent {...props} />);
    };

    return WithAuthentication;
}

export const redirectIfAuthenticated = (WrappedComponent) => {
    const RedirectIfAuthenticated = () => {
        if (global.utils.validSession()) {
            return <Redirect to="/home" />;
        }
        return (<WrappedComponent />);
    };

    return RedirectIfAuthenticated;
}
