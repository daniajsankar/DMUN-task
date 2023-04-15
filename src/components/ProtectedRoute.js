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
                const registered = localStorage.getItem('registered');
                if (registered) {
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
