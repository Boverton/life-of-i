import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path="/register" render={() => <h1>Register</h1>}/>
            <Route path="/" render={() => <h1>Home</h1>}/>
          </Switch>
        </Router>
    );
  }
}

export default App;
