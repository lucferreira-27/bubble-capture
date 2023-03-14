import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/form-capture">
          <FormCapturePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
