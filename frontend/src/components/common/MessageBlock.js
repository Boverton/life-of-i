import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/MessageBlock.css';


export default class MessageBlock extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        // set timeout
    }

    render() {
        let apiResponseMessages = this.props.apiResponseMessages,
            type = apiResponseMessages.type,
            apiMessages = apiResponseMessages.messages;

        const messages = apiMessages.map( (message, key) => {
            return (
                <span key={key}>
                    {message}
                </span>
            )
        });


        return (
            <div className={"message-block " + type }>
                { messages }
            </div>
        )
    }
}

MessageBlock.propTypes = {
  apiResponseMessages: PropTypes.object.isRequired,
};
