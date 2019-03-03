import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from './components/auth/Register';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/" render={() => <h1>Home</h1>}/>
          </Switch>
        </Router>
    );
  }
}

export default App;
