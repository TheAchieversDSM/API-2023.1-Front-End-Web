import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export default function ModalForm(props: any) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
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
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{props.campo1}</Form.Label>
                            <Form.Control
                                type={props.tipo1}
                                placeholder={props.placeholder1}
                                autoFocus
                                value={props.value1}
                                onChange={props.function1}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{props.campo2}</Form.Label>
                            <Form.Control
                                type={props.tipo2}
                                placeholder={props.placeholder2}
                                autoFocus
                                value={props.value2}
                                onChange={props.function2}
                            />
                        </Form.Group>
                    </Form>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.function}>
                            Fechar
                        </Button>
                        <Button variant="primary-botaozinho" onClick={props.function}>
                            Salvar Alterações
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
}