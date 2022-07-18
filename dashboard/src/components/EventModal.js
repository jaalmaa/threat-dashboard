import { React, useState, Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UrlVT, HashVT } from './VTStats';
import './EventModal.scss';

class Hash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverOver: false,
            data: []
        };
    }

    handleMouseOver = () => {
        this.setState({hoverOver: true});
    };

    handleMouseOut = () => {
        this.setState({hoverOver: false});
    };

    async vt_query(hash) {
        const response = await fetch("https://www.virustotal.com/api/v3/files/".concat(hash), {method: 'GET', headers: {Accept: 'application/json', 'x-apikey': process.env.REACT_APP_VT_KEY}});
        const json = await response.json();
        this.setState({ data: json });
    }
    
    render() {
        const hash = this.props.hash;

        if (Object.keys(this.state.data).length) {
            return(
                <span><span className="indicator">{ hash }</span> <HashVT data={this.state.data} hash={hash}/></span>
            )
        }

        else {

            return(
                <div className="indicator" onMouseOver={() => this.handleMouseOver()} onMouseOut={() => this.handleMouseOut()}>{ hash }{this.state.hoverOver && <Button className="button" onClick={() => this.vt_query(hash)}>VT Scan</Button>}</div>
            )

            }
    }
}

class Url extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverOver: false,
            data: []
        };
    }

    handleMouseOver = () => {
        this.setState({hoverOver: true});
    };

    handleMouseOut = () => {
        this.setState({hoverOver: false});
    };

    async vt_query(url) {
        const b64_url = Buffer.from(url).toString('base64').replace(/={1,2}$/, '');
        const response = await fetch("https://www.virustotal.com/api/v3/urls/".concat(b64_url), {method: 'GET', headers: {Accept: 'application/json', 'x-apikey': process.env.REACT_APP_VT_KEY}});
        const json = await response.json();
        this.setState({ data: json });
    }
    
    render() {
        const url = this.props.url;

        if (Object.keys(this.state.data).length) {
            return(
                <span><span className="indicator">{ url }</span> <UrlVT data={this.state.data} url={url}/></span>
            )
        }

        else {

            return(
                <div className="indicator" onMouseOver={() => this.handleMouseOver()} onMouseOut={() => this.handleMouseOut()}><span>{ url }{this.state.hoverOver && <Button className="button" onClick={() => this.vt_query(url)}>VT Scan</Button>}</span></div>
            )

        }
    }
}

const EventModal = (props) => {

    return (
            <Modal isOpen={props.data.visible} toggle={props.toggle} size={'lg'}>
                <ModalHeader toggle={props.toggle}>Event Info</ModalHeader>
                <ModalBody>
                    <div className="modal-body">
                        <b>Credentials Used: </b>
                        <div>{ props.data.credentials }</div>
                            
                        <b>Command History:</b>
                        <div>{ props.data.commands.length ? props.data.commands.map((command, index) => <div className="indicator" key={index}>{ command }</div>) : <p>None</p> }</div>
                                            
                        <b>Urls identified: </b>
                        <div>{ props.data.urls.length ? props.data.urls.map((url, index) => <Url key={index} url={url} />) : <p>None</p>} </div> 

                        <b>File hashes: </b>
                        <div>{ props.data.hashes.length ? props.data.hashes.map((hash, index) => <Hash  key={index} hash={hash}/>) : <p>None</p>}</div>
                        {/* <b>Detections: </b>
                        <div>{ props.data.detections.length ? props.data.detections.map((detection, index) => <div key={index}>{ detection.split("_").slice(0, -1).join(".") }</div>) : <p>None</p> }</div> */}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={props.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
    )
}

export default EventModal;