import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function MyVerticallyCenteredModal(props:any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><b>{props.coluna1}</b>{props.resp1}</p>
        <p><b>{props.coluna2}</b>{props.resp2}</p>
        <p><b>{props.coluna3}</b>{props.resp3}</p>
        <p><b>{props.coluna4}</b>{props.resp4}</p>
        <p><b>{props.coluna5}</b>{props.resp5}</p>
        <p><b>{props.coluna6}</b>{props.resp6}</p>
      </Modal.Body>
    </Modal>
  );
}