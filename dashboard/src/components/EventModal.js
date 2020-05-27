import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EventModal = (props) => {
    return (
        <Modal isOpen={props.data.visible} toggle={props.toggle} size={'lg'}>
            <ModalHeader toggle={props.toggle}>Event Info</ModalHeader>
            <ModalBody>
                <b>Credentials Used: </b>
                <div>{ props.data.credentials }</div>
                    
                <b>Command History:</b>
                { props.data.commands }
                                    
                <b>Urls identified: </b>
                { props.data.urls.length ? props.data.urls.map((url, index) => <div key={index}>{ url }</div>) : <p>None</p>}

                <b>File hashes: </b>
                { props.data.hashes.length ? props.data.hashes.map((hash, index) => <div key={index}>{ hash }</div>) : <p>None</p>}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}

export default EventModal;