/* This the child component for honeypot events */
import React, { Component } from 'react';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Event extends Component {
    constructor() {
        super();
        this.state = {
            'modal': false
        };
    }

    toggle = () => {
        this.setState({ 'modal': !this.state.modal });
    }

    render() {

        /* 
            Check for credentials - if there are none, don't render the event
            Need some styling on the event elements.
            Would be cool if old events disappeared as new ones were added, but this will have to be done in the feed component
        */

        const channel = this.props.session.channel;
        const timestamp = this.props.session.timestamp;
        const urls = this.props.session.payload.urls;
        const hashes = this.props.session.payload.hashes;
        const credentials = this.props.session.payload.loggedin ? <code>{this.props.session.payload.loggedin[0]}:{this.props.session.payload.loggedin[1]}</code> : 'null';
        const commands = this.props.session.payload.commands ? this.props.session.payload.commands
            .filter(command => { return command; })
            .map(command => <><code>{command}</code><br/></>) : <p>null</p>;
        
        return (
            <Alert key={this.props.id} color="secondary">
                <b>{channel}</b>
                <p>Timestamp: { timestamp }</p>
                <p>Unique hashes: { hashes ? hashes.length : '0' }</p>
                <p>URLs: { urls ? urls.length: '0' }</p>
                <Button color='primary' onClick={this.toggle}>Info</Button>

                {/* @TODO move to separate component */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} size={'lg'}>
                    <ModalHeader toggle={this.toggle}>Event Info</ModalHeader>
                    <ModalBody>

                        {/* @TODO: move to separate component */}
                        <b>Credentials Used: </b>
                        <code>{ credentials }</code>
                        <br />

                        {/* @TODO: move to component containing dropdown to view commands */}
                        <b>Command History:</b>
                        <p>{ commands }</p>
                        
                        {/* @TODO: move to separate component */}
                        <b>Urls identified: </b>
                        <p>{ urls }</p>

                        {/* @TODO: move to separate component */}
                        <b>File hashes: </b>
                        <p>{ hashes }</p>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Alert>
        )
    }
}

export default Event;