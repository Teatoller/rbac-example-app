import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import Auth from "./components/Auth";
import * as serviceWorker from "./serviceWorker";
import CallbackPage from "./pages/callback";

function App() {
  return (
    <div className="App container">
      <Auth>
        <div className="jumbotron">
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/callback" component={CallbackPage} />
            </Switch>
          </Router>
        </div>
      </Auth>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
