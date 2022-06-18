import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../../hooks";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <Route
      {...rest}
      path={path}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <>
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
