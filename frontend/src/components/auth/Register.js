import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../../lib/requestHelper';
import { updateInputObject, createPayload, inputObject } from '../../lib/formHelper';
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
    }

    render() {
        let username = this.state.inputs.username.value,
            email = this.state.inputs.email.value,
            password = this.state.inputs.password.value;


        return (
            <div className="auth-view">
                <div className="form-container">
                    <div className="inputs-container">
                        <input
                            placeholder="username"
                            type="text"
                            name="username"
                            value={username}
                            onChange={(event) => this.setState(updateInputObject(event, {...this.state}))}
                        />
                        <input
                            placeholder="email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={(event) => this.setState(updateInputObject(event, {...this.state}))}

                        />
                        <input
                            placeholder="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) => this.setState(updateInputObject(event, {...this.state}))}
                        />
                    </div>
                    <div className="buttons-container">
                        <button>
                            Register
                        </button>
                        <Link to={"/login"}>
                            <button>
                                Back To Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}