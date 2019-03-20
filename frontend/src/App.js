import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from './components/auth/Register';
import axios from 'axios';


class App extends Component {
    constructor() {
        super();

        this.state = {
            apiResponseMessages: {
                type: "",
                messages: [],
            }
        }
    }

    componentDidMount() {
        axios.interceptors.response.use(response => {
            let type = response.status === 400 ? "error" : "success";
            this.updateMessages(response.data.errors, type);
            return response;
        })
    }

    updateMessages(messages, type) {
        let apiResponseMessages = {...this.state.apiResponseMessages},
            messagesArray = [];

        if (messages.length !== 0) {
            for (let index in messages) {
                messagesArray.push(messages[index].message);
            }
        }

        apiResponseMessages.type = type;
        apiResponseMessages.messages = messagesArray;

        this.setState({apiResponseMessages: apiResponseMessages});
    }

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
