/* This the child component for honeypot events */
import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class Event extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {

        /* 
            Check for credentials - if there are none, don't render the event
            Need some styling on the event elements.
            Would be cool if old events disappeared as new ones were added, but this will have to be done in the feed component
        */

        const channel = this.props.session.channel;
        const credentials = this.props.session.payload.loggedin ? <code>{this.props.session.payload.loggedin[0]}:{this.props.session.payload.loggedin[1]}</code> : 'null';
        const commands = this.props.session.payload.commands ? this.props.session.payload.commands.map(command => <><code>{command}</code><br/></>) : <p>null</p>;
        return (
            <Alert color="secondary">
                <b>{channel}</b>
                <p>Credentials: {credentials}</p>
                <p>Commands:<br/>{commands}</p>
            </Alert>
        )
    }
}


export default Event;