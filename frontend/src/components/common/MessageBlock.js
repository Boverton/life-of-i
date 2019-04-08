import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/MessageBlock.css';

export default class MessageBlock extends Component {

    constructor(props) {
        super(props);

	console.log("Testing this out");
	console.log("adding another test");

        this.state = {
            show: false,
        };

        // keep track of the timer so we can clear it
        this.timer = undefined;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        let before = JSON.stringify(this.props),
            next = JSON.stringify(nextProps),
            show = true;

        // props the same?  just update
        if (before === next) {
            return;
        }

        // hide the message block if there are none to display
        if (nextProps.apiResponseMessages.messages.length === 0) {
            show = false;
        }

        this.setState({show: show});

        clearInterval(this.timer);
        this.startTimer();
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    /**
     * Start the timer for visibility of message block
     */
    startTimer = ()=> {
        this.timer = setTimeout(() =>{
            this.close()}, 10000);
    };

    /**
     * Close the message block and clear the apiResponseMessages in App.js
     */
    close = () =>  {
        this.setState({show: false});
        clearInterval(this.timer);
        this.props.updateMessages([], this.props.apiResponseMessages.type);
    };

    render() {
        let apiResponseMessages = this.props.apiResponseMessages,
            type = apiResponseMessages.type,
            apiMessages = apiResponseMessages.messages,
            show = this.state.show;

        const messages = apiMessages.map( (message, key) => {
            return (
                <span key={key}>
                    {message}
                </span>
            )
        });

        return (
            <div className={(show ? "show " : "") + "message-block " + type}>
                { messages }
            </div>
        )
    }
}

MessageBlock.propTypes = {
    apiResponseMessages: PropTypes.object.isRequired,
    updateMessages: PropTypes.func.isRequired,
};
