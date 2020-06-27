import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


const CreateModal = ({
    show,
    setShow,
    createLink
}) => {
    const [ name, setName ] = useState("");
    const [ url, setUrl ] = useState("");
    const [ comment, setComment ] = useState("");
    const [ tags, setTags ] = useState("");

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={ show } onHide={ handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Site Name:</Form.Label>
                        <Form.Control type="text" placeholder="Site Name" onChange= { event => setName(event.target.value) } value={ name }/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Site URL:</Form.Label>
                        <Form.Control type="text" placeholder="Site URL" onChange= { event => setUrl(event.target.value) } value={ url }/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label>Comment:</Form.Label>
                        <Form.Control type="text" placeholder="Site Comment" onChange= { event => setComment(event.target.value) } value={ comment }/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput4">
                        <Form.Label>Tags:</Form.Label>
                        <Form.Control type="text" placeholder="tags..." onChange= { event => setTags(event.target.value) } value={ tags }/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleClose }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => createLink(name, url, comment, tags), handleClose }>
                        Create Link
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateModal;