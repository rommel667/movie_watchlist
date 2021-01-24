import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const DeleteModal = ({ show, cancelHandler, deleteHandler, title }) => {

    return (
        <Modal show={show} onHide={cancelHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the movie: {title}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelHandler}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default DeleteModal