import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './EventModal.scss';

const EventModal = (props) => {
    return (
        <Modal isOpen={props.data.visible} toggle={props.toggle} size={'lg'}>
            <ModalHeader toggle={props.toggle}>Event Info</ModalHeader>
            <ModalBody>
                <div className="modal-body">
                    <b>Credentials Used: </b>
                    <div>{ props.data.credentials }</div>
                        
                    <b>Command History:</b>
                    <div>{ props.data.commands }</div>
                                        
                    <b>Urls identified: </b>
                    <div>{ props.data.urls.length ? props.data.urls.map((url, index) => <div key={index}>{ url }</div>) : <p>None</p>}</div>

                    <b>File hashes: </b>
                    <div>{ props.data.hashes.length ? props.data.hashes.map((hash, index) => <div key={index}>{ hash }</div>) : <p>None</p>}</div>

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