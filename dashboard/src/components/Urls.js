import React, { Component } from 'react';
import EventModal from './EventModal';
import './views.scss';

class Urls extends Component {
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
        const timestamp = new Date(Date.parse(this.props.session.startTime)).toLocaleString();
        const urls = this.props.session.url;
        //const src_ip = this.props.session.src_ip;
        const hashes = this.props.session.shasum;
        const credentials = this.props.session.credentials ? <div>{<div className="credential">{this.props.session.credentials.username}</div>}:{<div className="credential">{this.props.session.credentials.password}</div>}</div> : 'null';
        const commands = this.props.session.commands ? this.props.session.commands
            .filter(command => { return command; })
            .map((command, index) => <div key={index}>{command}</div>) : <p>null</p>;
        const detections = this.props.session.detections;

        const modal_props = {
            urls: urls,
            hashes: hashes,
            credentials: credentials,
            commands: commands,
            detections: detections,
            visible: this.state.modal_visible
        };

        if (urls.length !== 0) {
            return (
                <div onClick={this.toggle} className="view-container">
                    <div>{this.props.id + 1}</div>
                    <div>{ timestamp }</div>
                    <div>{ urls.map((url, index) => <div className="technical-stat" key={index}>{ url }</div>) }</div>
                    <EventModal data={modal_props} toggle={this.toggle} />
                </div>
            )
        }

        else {
            return(null)
        }
    }

}

export default Urls;