import React from "react";
import { Redirect, NavLink } from "react-router-dom";
import { AuthConsumer } from "../authContext";
import Login from "../components/Login";
// import PostsList from "../components/PostsList";

const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <div>
          <h2>
            <NavLink to="https://auth0.com/blog/role-based-access-control-rbac-and-react-apps/#Introduction-to-Role-Based-Access-Control">
              Welcome to React RBAC Tutorial.
            </NavLink>
          </h2>
          <Login />
          {/* <PostsList /> */}
        </div>
      )
    }
  </AuthConsumer>
);

export default HomePage;
