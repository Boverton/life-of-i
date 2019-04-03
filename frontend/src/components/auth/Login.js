import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { post } from '../../lib/requestHelper';
import {
    updateInputObject, createPayload,
    inputObject, updateInputWithError,
    clearErrorOnBlur } from '../../lib/formHelper';
import '../../styles/form.css';

export default class Login extends Component {
    constructor() {
        super();

        this.state = {

        };
    }
}