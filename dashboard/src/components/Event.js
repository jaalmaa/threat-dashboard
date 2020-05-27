/* This the child component for honeypot events */
import React, { Component } from 'react';
import EventModal from './EventModal';
import './Event.scss';

class Event extends Component {
    constructor() {
        super();
        this.state = {
            modal_visible: false
        };
    }

    toggle = () => {
        this.setState({ modal_visible: !this.state.modal_visible });
    }

    render() {

        const timestamp = new Date(Date.parse(this.props.session.timestamp)).toLocaleString();
        const urls = this.props.session.payload.urls;
        const hashes = this.props.session.payload.hashes;
        const credentials = this.props.session.payload.loggedin ? <code>{this.props.session.payload.loggedin[0]}:{this.props.session.payload.loggedin[1]}</code> : 'null';
        const commands = this.props.session.payload.commands ? this.props.session.payload.commands
            .filter(command => { return command; })
            .map(command => <><code>{command}</code><br/></>) : <p>null</p>;

        const modal_props = {
            urls: urls,
            hashes: hashes,
            credentials: credentials,
            commands: commands,
            visible: this.state.modal_visible
        };
        
        return (
            <>
                <tr onClick={this.toggle} className="event-row">
                    <td className="table-col">{ this.props.id + 1 }</td>
                    <td className="table-col">{ timestamp }</td>
                    <td className={"table-col" + (urls.length !== 0 ? " highlight" : '')}>{ urls.length }</td>
                    <td className={"table-col" + (urls.length !== 0 ? " highlight" : '')}>{ hashes.length }</td>
                    <td className="table-col">{ commands.length }</td>
                </tr>
                <EventModal data={modal_props} toggle={this.toggle} />
            </>
        )
    }
}

export default Event;