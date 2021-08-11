import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/Signup/Index";

import { checkAuthenticatedUser } from "../components/utility/authentication";
import DashBoard from "../pages/DashBoard";

const Routes = () => {
  return (
    <Router>
      <Route
        exact
        path="/signup"
        render={() => (checkAuthenticatedUser() ? <Redirect to="/dashboard" /> : <SignUp />)}
      />
      <Route
        exact
        path="/signin"
        render={() => (checkAuthenticatedUser() ? <Redirect to="/dashboard" /> : <SignIn />)}
      />
      <Route
        exact
        path="/dashboard"
        render={() => (checkAuthenticatedUser() ? <DashBoard /> : <Redirect to="/signin" />)}
      />
      <Route
        exact
        path="/"
        render={() => (checkAuthenticatedUser() ? <Redirect to="/dashboard" /> : <Redirect to="/signin" />)}
      />
    </Router>
  );
};

export default Routes;
