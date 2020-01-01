import React, { Component } from "react";
import auth0 from "auth0-js";

import { AUTH_CONFIG } from "../auth0-variables";
import { AuthProvider } from "../authContext";

const auth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: "token id_token"
});

class Auth extends Component {
  state = {
    authenticated: false,
    user: {
      role: "visitor"
    },
    accessToken: ""
  };

  /**
   * Call the authorize method of auth to redirect users to the Auth0 login page
   * When users fill the form and complete the authentication process, Auth0 redirects
   * them back to your app at http://localhost:3000/callback.
   * The redirect URL, in this case, will contain some important information
   * for your app (like the ID token).
   */

  initiateLogin = () => {
    auth.authorize();
  };

  /**
   * To enable users to log out, you reset the state
   * and revert their role to visitor
   */

  logout = () => {
    this.setState({
      authenticated: false,
      user: {
        role: "visitor"
      },
      accessToken: ""
    });
  };

  /**
   * Fetch these informations, by making handleAuthentication
   * call the parseHash method of auth
   */

  handleAuthentication = () => {
    auth.parseHash((error, authResult) => {
      if (error) {
        console.log(error);
        console.log(`Error ${error.error} occured`);
        return;
      }

      this.setSession(authResult.idTokenPayload);
    });
  };

  /**
   * Make parseHash call setSession with
   * the user profile (idTokenPayload):
   */

  setSession(data) {
    const user = {
      id: data.sub,
      email: data.email,
      role: data[AUTH_CONFIG.roleUrl]
    };
    this.setState({
      authenticated: true,
      accessToken: data.accessToken,
      user
    });
  }

  render() {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;
