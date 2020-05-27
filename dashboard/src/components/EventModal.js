import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EventModal = (props) => {
    return (
        <Modal isOpen={props.data.visible} toggle={props.toggle} size={'lg'}>
            <ModalHeader toggle={props.toggle}>Event Info</ModalHeader>
            <ModalBody>
                <b>Credentials Used: </b>
                <code>{ props.data.credentials }</code>
                <br />
                    
                <b>Command History:</b>
                <p>{ props.data.commands }</p>
                                    
                <b>Urls identified: </b>
                { props.data.urls.length ? props.data.urls.map(url => <p>{ url }</p>) : <p>None</p>}

                <b>File hashes: </b>
                { props.data.hashes.length ? props.data.hashes.map(hash => <p>{ hash }</p>) : <p>None</p>}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}

export default EventModal;