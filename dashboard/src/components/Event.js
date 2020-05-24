/* This the child component for honeypot events */
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Event.scss';

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

        const timestamp = new Date(Date.parse(this.props.session.timestamp)).toLocaleString();
        const urls = this.props.session.payload.urls;
        const hashes = this.props.session.payload.hashes;
        const credentials = this.props.session.payload.loggedin ? <code>{this.props.session.payload.loggedin[0]}:{this.props.session.payload.loggedin[1]}</code> : 'null';
        const commands = this.props.session.payload.commands ? this.props.session.payload.commands
            .filter(command => { return command; })
            .map(command => <><code>{command}</code><br/></>) : <p>null</p>;
        
        return (
            <>
                <tr key={this.props.id} onClick={this.toggle} className="event-row">
                    <td className="table-col">{ this.props.id }</td>
                    <td className="table-col">{ timestamp }</td>
                    <td className="table-col">{ hashes ? hashes.length : '0' }</td>
                    <td className="table-col">{ urls ? urls.length : '0' }</td>
                    <td className="table-col">{ commands ? commands.length : '0' }</td>
                </tr>

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
                        <p>{ urls ? urls: 'None' }</p>

                        {/* @TODO: move to separate component */}
                        <b>File hashes: </b>
                        <p>{ hashes ? hashes: 'None' }</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Event;