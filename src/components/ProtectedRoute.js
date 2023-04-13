import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        const loggedIn = localStorage.getItem('registered');
        if (loggedIn) {
          return <Component {...props} />;
        }

        return (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
