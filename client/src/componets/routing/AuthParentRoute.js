import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthParentRoute = ({
  component: Component,
  parent: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

AuthParentRoute.propTypes = {
  parent: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  parent: state.parent,
});

export default connect(mapStateToProps)(AuthParentRoute);
