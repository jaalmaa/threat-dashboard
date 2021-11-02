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
        const src_ip = this.props.session.payload.peerIP;
        const hashes = this.props.session.payload.hashes;
        const credentials = this.props.session.payload.loggedin ? <div>{this.props.session.payload.loggedin[0]}:{this.props.session.payload.loggedin[1]}</div> : 'null';
        const commands = this.props.session.payload.commands ? this.props.session.payload.commands
            .filter(command => { return command; })
            .map((command, index) => <div key={index}>{command}</div>) : <p>null</p>;

        const modal_props = {
            urls: urls,
            hashes: hashes,
            credentials: credentials,
            commands: commands,
            visible: this.state.modal_visible
        };
        
        return (
            <div onClick={this.toggle} className="feed-container">
                    <div>{this.props.id + 1}</div>
                    <div>{ timestamp }</div>
                    <div>{ src_ip }</div>
                    <div className={ urls.length !== 0 ? 'highlight' : '' }>{ urls.length }</div>
                    <div className={ hashes.length !== 0 ? 'highlight' : '' }>{ hashes.length }</div>
                    <div>{ commands.length }</div>
                    <EventModal data={modal_props} toggle={this.toggle} />
            </div>
        )
    }
}

export default Event;