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
                    <td className="table-col">{ this.props.id + 1 }</td>
                    <td className="table-col">{ timestamp }</td>
                    <td className={"table-col" + (urls.length !== 0 ? " highlight" : '')}>{ urls.length }</td>
                    <td className={"table-col" + (urls.length !== 0 ? " highlight" : '')}>{ hashes.length }</td>
                    <td className="table-col">{ commands.length }</td>
                </tr>

                {/* @TODO: move to separate component */}
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
                        { urls.length ? urls.map(url => <p className="p-modal">{ url }</p>) : <p>None</p>}

                        {/* @TODO: move to separate component */}
                        <b>File hashes: </b>
                        { hashes.length ? hashes.map(hash => <p className="p-modal">{ hash }</p>) : <p>None</p>}
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