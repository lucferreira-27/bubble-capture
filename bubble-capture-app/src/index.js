import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormCapturePage from "./pages/FormCapturePage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/form-capture">
          <FormCapturePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
