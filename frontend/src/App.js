import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from './components/auth/Register';
import axios from 'axios';
import MessageBlock from "./components/common/MessageBlock";


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

    /**
     * updates state.apiResponseMessages
     *
     * @param messages
     *   passing in empty array clears the messages and the type
     * @param type
     */
    updateMessages(messages, type) {
        let apiResponseMessages = {...this.state.apiResponseMessages},
            messagesArray = [];

        if (messages.length !== 0) {
            for (let index in messages) {
                messagesArray.push(messages[index].message);
            }
        }
        else {
            // clear the type if 0 messages
            type = "";
        }

        apiResponseMessages.type = type;
        apiResponseMessages.messages = messagesArray;

        this.setState({apiResponseMessages: apiResponseMessages});
    }

    render() {
        return (
            <div>
                <Router>
                  <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/" render={() => <h1>Home</h1>}/>
                  </Switch>
                </Router>
                <MessageBlock apiResponseMessages={this.state.apiResponseMessages}/>
            </div>
        );
  }
}

export default App;
