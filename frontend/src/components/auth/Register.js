import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { post } from '../../lib/requestHelper';
import {
    updateInputObject, createPayload,
    inputObject, updateInputWithError,
    clearErrorOnBlur } from '../../lib/formHelper';
import '../../styles/form.css';


export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                username: inputObject(),
                email: inputObject(),
                password: inputObject(),
            }
        };

        this.source = axios.CancelToken.source();
    }

    componentWillUnmount() {
        this.source.cancel();
    }

    /**
     * Post the registration fields to register
     * @param event
     */
    postToRegister = (event) => {
        event.preventDefault();
        let payload = createPayload(this.state);
        post('register', payload, this.source)
            .then( response => {
                if (response.data.errors) {
                    this.setState(updateInputWithError(response, {...this.state}));
                }
            });
    };

    render() {
        let {username, email, password} = this.state.inputs;

        return (
            <div className="auth-view">
                <form className="form-container">
                    <div className="inputs-container">
                        <input
                            placeholder="username"
                            id="username"
                            type="text"
                            name="username"
                            value={username.value}
                            onChange={(event) => this.setState(updateInputObject(event, {...this.state}))}
                            onBlur={(event) => this.setState(clearErrorOnBlur(event, {...this.state}))}
                            className={ username.error ? "input-error" : ""}
                        />
                        <input
                            placeholder="email"
                            id="email"
                            type="text"
                            name="email"
                            value={email.value}
                            onChange={(event) => this.setState(updateInputObject(event, {...this.state}))}
                            onBlur={(event) => this.setState(clearErrorOnBlur(event, {...this.state}))}
                            className={ email.error ? "input-error" : ""}
                        />
                        <input
                            placeholder="password"
                            id="password"
                            type="password"
                            name="password"
                            value={password.value}
                            onChange={(event) => this.setState(updateInputObject(event, {...this.state}))}
                            onBlur={(event) => this.setState(clearErrorOnBlur(event, {...this.state}))}
                            className={ password.error ? "input-error" : ""}
                        />
                    </div>
                    <div className="buttons-container">
                        <button type="submit"
                            id="register-button"
                            onClick={this.postToRegister}
                        >
                            Register
                        </button>
                        <Link to={"/login"}>
                            <button>
                                Back To Login
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}