import * as React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";
import "./App.scss";
import Layout from "./app/components/Layout/Layout";
import Login from "./app/features/Login/Login";
import Failed from "./app/components/Failed/Failed";
import { menuRoutes } from "./constants/menuRoutes.constants";
import PrivateRoute from "./app/components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <>
      <HashRouter basename="/">
        <Layout>
          <Switch>
            {menuRoutes.map((menuRoute) => {
              return <PrivateRoute exact key={menuRoute.path} path={menuRoute.path} component={menuRoute.component} />;
            })}
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/failed" exact render={() => <Failed />} />
            <Route exact path="*">
              <Redirect to={menuRoutes.length > 0 ? menuRoutes[0].path : "/failed"} />
            </Route>
          </Switch>
        </Layout>
      </HashRouter>
    </>
  );
};

export default hot(module)(App);
